from decouple import config


def _to_async_url(url: str) -> str:
    """Normaliza a connection string do Postgres para o driver asyncpg.

    Provedores como Railway e Render entregam DATABASE_URL como
    `postgres://` ou `postgresql://` (driver síncrono padrão), mas o
    projeto usa SQLAlchemy assíncrono e precisa de `postgresql+asyncpg://`.
    """
    if url.startswith("postgres://"):
        return "postgresql+asyncpg://" + url[len("postgres://"):]
    if url.startswith("postgresql://"):
        return "postgresql+asyncpg://" + url[len("postgresql://"):]
    return url


MOCK_MODE: bool = config("MOCK_MODE", cast=bool, default=False)

if MOCK_MODE:
    DATABASE_URL: str = "sqlite+aiosqlite:///:memory:"
else:
    DATABASE_URL: str = _to_async_url(config("DATABASE_URL", default="sqlite+aiosqlite:///./aurorape.db"))

SECRET_KEY: str = config("SECRET_KEY", default="dev-secret-key-change-in-production")
ALGORITHM: str = config("ALGORITHM", default="HS256")
ACCESS_TOKEN_EXPIRE_MINUTES: int = config("ACCESS_TOKEN_EXPIRE_MINUTES", cast=int, default=60)
DEBUG: bool = config("DEBUG", cast=bool, default=True)
SITE_NAME: str = config("SITE_NAME", default="Aurora PE")
SITE_URL: str = config("SITE_URL", default="http://localhost:8000")

# Origens permitidas por CORS, separadas por vírgula (ex: "http://localhost:3000,https://aurorape.vercel.app")
CORS_ORIGINS: str = config("CORS_ORIGINS", default="http://localhost:3000")
