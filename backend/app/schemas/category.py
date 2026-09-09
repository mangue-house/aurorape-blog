from pydantic import BaseModel, ConfigDict


class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: str | None = None
    article_count: int = 0


class CategoryCreate(BaseModel):
    name: str
    slug: str | None = None
    description: str | None = None
