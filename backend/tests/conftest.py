import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.database import Base, get_db
from app.main import app
from app.models import *  # noqa: F401,F403
from app.models.category import Category
from app.models.author import Author
from app.models.article import Article
from app.models.user import AdminUser
from app.services.auth import hash_password
from datetime import datetime

TEST_DATABASE_URL = "sqlite+aiosqlite:///./test_aurorape.db"


@pytest_asyncio.fixture(scope="session")
async def engine():
    engine = create_async_engine(TEST_DATABASE_URL, echo=False)
    yield engine
    await engine.dispose()


@pytest_asyncio.fixture(autouse=True)
async def setup_db(engine):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture
async def db_session(engine):
    TestSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    async with TestSessionLocal() as session:
        yield session


@pytest_asyncio.fixture
async def client(db_session):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def seed_data(db_session: AsyncSession):
    cat = Category(name="Política", slug="politica", description="Cobertura política")
    author = Author(name="João Silva", slug="joao-silva", bio="Repórter")
    db_session.add_all([cat, author])
    await db_session.flush()

    article = Article(
        title="Primeira matéria de teste",
        slug="primeira-materia-de-teste",
        subtitle="Subtítulo de teste",
        chapeu="Política",
        body="<p>Conteúdo da matéria.</p>",
        is_published=True,
        published_at=datetime.utcnow(),
        reading_time_min=3,
        author_id=author.id,
        category_id=cat.id,
    )
    db_session.add(article)

    admin = AdminUser(email="admin@aurorape.com", hashed_password=hash_password("senha123"))
    db_session.add(admin)

    await db_session.commit()
    return {"category": cat, "author": author, "article": article, "admin": admin}


@pytest_asyncio.fixture
async def admin_token(client, seed_data):
    response = await client.post(
        "/api/v1/admin/auth/login",
        json={"email": "admin@aurorape.com", "password": "senha123"},
    )
    return response.json()["access_token"]


@pytest_asyncio.fixture
async def auth_client(client, admin_token):
    client.headers["Authorization"] = f"Bearer {admin_token}"
    return client
