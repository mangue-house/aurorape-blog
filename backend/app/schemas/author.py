from pydantic import BaseModel, ConfigDict, EmailStr, Field


class AuthorMini(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    photo_url: str | None = None


class AuthorOut(AuthorMini):
    bio: str | None = None
    social_links: dict | None = None
    role: str | None = None
    email: str | None = None


class AuthorCreate(BaseModel):
    name: str
    slug: str | None = None
    bio: str | None = None
    photo_url: str | None = None
    social_links: dict | None = None
    role: str
    email: EmailStr
    password: str = Field(min_length=8)


class AuthorUpdate(BaseModel):
    name: str
    slug: str | None = None
    bio: str | None = None
    photo_url: str | None = None
    social_links: dict | None = None
    role: str
    email: EmailStr
    password: str | None = Field(default=None, min_length=8)
