import re
import unicodedata

import bleach
from sqlalchemy import select

ALLOWED_TAGS = [
    "p", "h2", "h3", "h4", "strong", "em", "b", "i", "u",
    "a", "ul", "ol", "li", "blockquote", "br", "img",
]
ALLOWED_ATTRS = {"a": ["href", "title", "rel", "target"], "img": ["src", "alt"]}


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^\w\s-]", "", value).strip().lower()
    return re.sub(r"[-\s]+", "-", value)


async def unique_slug(db, base_slug: str, model, exclude_id: int | None = None) -> str:
    slug = base_slug
    suffix = 2
    while True:
        query = select(model.id).where(model.slug == slug)
        if exclude_id is not None:
            query = query.where(model.id != exclude_id)
        result = await db.execute(query)
        if not result.scalars().first():
            return slug
        slug = f"{base_slug}-{suffix}"
        suffix += 1


def calculate_reading_time(html_body: str, words_per_minute: int = 200) -> int:
    text = re.sub(r"<[^>]+>", " ", html_body)
    words = len(text.split())
    return max(1, -(-words // words_per_minute))  # divisão com arredondamento para cima


def sanitize_html(html: str) -> str:
    return bleach.clean(html, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS, strip=True)
