from decouple import config

MOCK_MODE: bool = config("MOCK_MODE", cast=bool, default=True)

if MOCK_MODE:
    DATABASE_URL: str = "sqlite+aiosqlite:////tmp/aurorape.db"
else:
    DATABASE_URL: str = config("DATABASE_URL", default="sqlite+aiosqlite:///./aurorape.db")

SECRET_KEY: str = config("SECRET_KEY", default="dev-secret-key-change-in-production")
ALGORITHM: str = config("ALGORITHM", default="HS256")
ACCESS_TOKEN_EXPIRE_MINUTES: int = config("ACCESS_TOKEN_EXPIRE_MINUTES", cast=int, default=60)
DEBUG: bool = config("DEBUG", cast=bool, default=True)
SITE_NAME: str = config("SITE_NAME", default="Aurora PE")
SITE_URL: str = config("SITE_URL", default="http://localhost:8000")
