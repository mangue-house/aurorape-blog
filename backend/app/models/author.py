from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import JSON

from app.database import Base


class Author(Base):
    __tablename__ = "authors"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    slug: Mapped[str] = mapped_column(String(170), unique=True, nullable=False, index=True)
    bio: Mapped[str | None] = mapped_column(Text)
    photo_url: Mapped[str | None] = mapped_column(String(500))
    social_links: Mapped[dict | None] = mapped_column(JSON)
    role: Mapped[str | None] = mapped_column(String(150))
    user_id: Mapped[int | None] = mapped_column(ForeignKey("admin_users.id"), unique=True)

    user: Mapped["AdminUser"] = relationship("AdminUser")
    articles: Mapped[list["Article"]] = relationship("Article", back_populates="author")

    @property
    def email(self) -> str | None:
        return self.user.email if self.user else None

    def __repr__(self) -> str:
        return f"<Author {self.slug}>"
