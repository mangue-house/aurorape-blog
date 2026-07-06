from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.dependencies import get_current_admin
from app.models.article import Article
from app.models.author import Author
from app.models.category import Category
from app.models.user import AdminUser
from app.schemas.article import ArticleCreate, ArticleListItem, ArticleOut, ArticleUpdate
from app.schemas.author import AuthorCreate, AuthorOut
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.category import CategoryCreate, CategoryOut
from app.services import article as article_svc
from app.services.auth import authenticate_user, create_access_token
from app.services.text import calculate_reading_time, sanitize_html, slugify, unique_slug

router = APIRouter(prefix="/api/v1/admin", tags=["admin"])


# ─── Auth ────────────────────────────────────────────────────────────────────

@router.post("/auth/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, payload.email, payload.password)
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")
    token = create_access_token({"sub": user.email})
    return TokenResponse(access_token=token)


# ─── Dashboard ────────────────────────────────────────────────────────────────

@router.get("/dashboard")
async def dashboard(
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    total_articles = (await db.execute(select(func.count()).select_from(Article))).scalar()
    total_published = (
        await db.execute(select(func.count()).select_from(Article).where(Article.is_published == True))
    ).scalar()
    total_authors = (await db.execute(select(func.count()).select_from(Author))).scalar()
    recent = await article_svc.get_feed(db, limit=5)

    return {
        "total_articles": total_articles,
        "total_published": total_published,
        "total_authors": total_authors,
        "recent": [ArticleListItem.model_validate(a) for a in recent],
    }


# ─── Articles ─────────────────────────────────────────────────────────────────

@router.get("/articles", response_model=list[ArticleListItem])
async def articles_list(
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    result = await db.execute(
        select(Article)
        .options(selectinload(Article.author), selectinload(Article.category))
        .order_by(Article.created_at.desc())
    )
    return list(result.scalars().all())


@router.get("/articles/{article_id}", response_model=ArticleOut)
async def article_detail(
    article_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    result = await db.execute(
        select(Article)
        .where(Article.id == article_id)
        .options(selectinload(Article.author), selectinload(Article.category), selectinload(Article.tags))
    )
    article = result.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    return article


@router.post("/articles", response_model=ArticleOut, status_code=status.HTTP_201_CREATED)
async def article_create(
    payload: ArticleCreate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    base_slug = slugify(payload.slug or payload.title)
    slug = await unique_slug(db, base_slug, Article)
    body = sanitize_html(payload.body)
    reading_time = payload.reading_time_min or calculate_reading_time(body)

    article = Article(
        title=payload.title,
        slug=slug,
        subtitle=payload.subtitle,
        chapeu=payload.chapeu,
        body=body,
        featured_image_url=payload.featured_image_url,
        reading_time_min=reading_time,
        is_published=payload.is_published,
        published_at=datetime.utcnow() if payload.is_published else None,
        author_id=payload.author_id,
        category_id=payload.category_id,
    )
    db.add(article)
    await db.commit()
    await db.refresh(article, attribute_names=["author", "category", "tags", "created_at", "updated_at"])
    return article


@router.put("/articles/{article_id}", response_model=ArticleOut)
async def article_update(
    article_id: int,
    payload: ArticleUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")

    base_slug = slugify(payload.slug or payload.title)
    article.slug = await unique_slug(db, base_slug, Article, exclude_id=article_id)
    article.title = payload.title
    article.subtitle = payload.subtitle
    article.chapeu = payload.chapeu
    article.body = sanitize_html(payload.body)
    article.featured_image_url = payload.featured_image_url
    article.reading_time_min = payload.reading_time_min or calculate_reading_time(article.body)
    article.author_id = payload.author_id
    article.category_id = payload.category_id
    if payload.is_published and not article.is_published:
        article.published_at = datetime.utcnow()
    article.is_published = payload.is_published

    await db.commit()
    await db.refresh(article, attribute_names=["author", "category", "tags", "created_at", "updated_at"])
    return article


@router.delete("/articles/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
async def article_delete(
    article_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalars().first()
    if article:
        await db.delete(article)
        await db.commit()
    return None


# ─── Authors ──────────────────────────────────────────────────────────────────

@router.get("/authors", response_model=list[AuthorOut])
async def authors_list(
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    result = await db.execute(select(Author).order_by(Author.name))
    return list(result.scalars().all())


@router.post("/authors", response_model=AuthorOut, status_code=status.HTTP_201_CREATED)
async def author_create(
    payload: AuthorCreate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    slug = await unique_slug(db, slugify(payload.slug or payload.name), Author)
    author = Author(
        name=payload.name,
        slug=slug,
        bio=payload.bio,
        photo_url=payload.photo_url,
        social_links=payload.social_links,
    )
    db.add(author)
    await db.commit()
    await db.refresh(author)
    return author


# ─── Categories ───────────────────────────────────────────────────────────────

@router.get("/categories", response_model=list[CategoryOut])
async def categories_list(
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    return await article_svc.get_all_categories(db)


@router.post("/categories", response_model=CategoryOut, status_code=status.HTTP_201_CREATED)
async def category_create(
    payload: CategoryCreate,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    slug = await unique_slug(db, slugify(payload.slug or payload.name), Category)
    category = Category(name=payload.name, slug=slug, description=payload.description)
    db.add(category)
    await db.commit()
    await db.refresh(category)
    return category
