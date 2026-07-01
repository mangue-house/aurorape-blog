from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Request, Form
from fastapi.responses import HTMLResponse, Response
from fastapi.templating import Jinja2Templates
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import NewsletterSubscriber
from app.services import article as article_svc

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

# Jinja2 filter: format datetime
def _strftime(value, fmt="%d/%m/%Y"):
    if not value:
        return ""
    return value.strftime(fmt)

templates.env.filters["strftime"] = _strftime
templates.env.globals["now"] = datetime.utcnow()


async def _base_ctx(request: Request, db: AsyncSession) -> dict:
    categories = await article_svc.get_all_categories(db)
    return {"request": request, "categories": categories, "now": datetime.utcnow()}


@router.get("/", response_class=HTMLResponse)
async def homepage(request: Request, db: AsyncSession = Depends(get_db)):
    hero = await article_svc.get_hero(db)
    hero_id = hero.id if hero else None
    secondary = await article_svc.get_secondary(db, exclude_id=hero_id, limit=4)
    secondary_ids = [a.id for a in secondary] + ([hero_id] if hero_id else [])
    feed = await article_svc.get_feed(db, exclude_ids=secondary_ids, limit=10)

    ctx = await _base_ctx(request, db)
    ctx.update({"hero": hero, "secondary": secondary, "feed": feed})
    return templates.TemplateResponse(request, "public/index.html", ctx)


@router.get("/artigo/{slug}", response_class=HTMLResponse)
async def article_page(slug: str, request: Request, db: AsyncSession = Depends(get_db)):
    art = await article_svc.get_article_by_slug(db, slug)
    if not art:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")

    related = await article_svc.get_related(db, art)
    ctx = await _base_ctx(request, db)
    ctx.update({"article": art, "related": related})
    return templates.TemplateResponse(request, "public/article.html", ctx)


@router.get("/categoria/{slug}", response_class=HTMLResponse)
async def category_page(
    slug: str, request: Request, page: int = 1, db: AsyncSession = Depends(get_db)
):
    limit = 12
    offset = (page - 1) * limit
    articles = await article_svc.get_feed(db, category_slug=slug, limit=limit, offset=offset)

    ctx = await _base_ctx(request, db)
    cat = next((c for c in ctx["categories"] if c.slug == slug), None)
    if not cat:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    ctx.update({"category": cat, "articles": articles, "page": page})
    return templates.TemplateResponse(request, "public/category.html", ctx)


@router.get("/busca", response_class=HTMLResponse)
async def search(q: str = "", request: Request = None, db: AsyncSession = Depends(get_db)):
    results = []
    if q and len(q) >= 2:
        results = await article_svc.search_articles(db, q)

    ctx = {"request": request, "results": results, "query": q}
    # HTMX: retorna só o partial
    return templates.TemplateResponse(request, "public/search.html", ctx)


@router.post("/newsletter", response_class=HTMLResponse)
async def newsletter_subscribe(
    request: Request,
    email: str = Form(...),
    db: AsyncSession = Depends(get_db),
):
    existing = await db.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == email)
    )
    if not existing.scalars().first():
        db.add(NewsletterSubscriber(email=email))
        await db.commit()

    return HTMLResponse(
        '<p class="newsletter-confirm">✓ Obrigado! Você receberá nossas novidades em breve.</p>'
    )


@router.get("/sitemap.xml")
async def sitemap(request: Request, db: AsyncSession = Depends(get_db)):
    articles = await article_svc.get_feed(db, limit=500)
    base = str(request.base_url).rstrip("/")

    urls = [f"<url><loc>{base}/</loc></url>"]
    for art in articles:
        dt = art.published_at.strftime("%Y-%m-%d") if art.published_at else ""
        urls.append(
            f"<url><loc>{base}/artigo/{art.slug}</loc>"
            f"<lastmod>{dt}</lastmod></url>"
        )

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        + "".join(urls)
        + "</urlset>"
    )
    return Response(content=xml, media_type="application/xml")
