from typing import Optional
from sqlalchemy import JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Author(Base):
    __tablename__ = "authors"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    slug: Mapped[str] = mapped_column(String(170), unique=True, nullable=False, index=True)
    bio: Mapped[Optional[str]] = mapped_column(Text)
    photo_url: Mapped[Optional[str]] = mapped_column(String(500))
    social_links: Mapped[Optional[dict]] = mapped_column(JSON)

    articles: Mapped[list["Article"]] = relationship("Article", back_populates="author")

    def __repr__(self) -> str:
        return f"<Author {self.slug}>"
