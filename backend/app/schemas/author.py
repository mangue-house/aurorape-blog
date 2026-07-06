from pydantic import BaseModel, ConfigDict


class AuthorMini(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    photo_url: str | None = None


class AuthorOut(AuthorMini):
    bio: str | None = None
    social_links: dict | None = None


class AuthorCreate(BaseModel):
    name: str
    slug: str | None = None
    bio: str | None = None
    photo_url: str | None = None
    social_links: dict | None = None
