from datetime import datetime

from fastapi import APIRouter, Depends, Form, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.dependencies import get_current_admin
from app.models.article import Article
from app.models.author import Author
from app.models.category import Category
from app.models.user import AdminUser
from app.services.article import get_all_categories
from app.services.auth import authenticate_user, create_access_token, hash_password
from app.services.article import get_feed

router = APIRouter(prefix="/admin")
templates = Jinja2Templates(directory="app/templates")


def _strftime(value, fmt="%d/%m/%Y"):
    if not value:
        return ""
    return value.strftime(fmt)

templates.env.filters["strftime"] = _strftime
templates.env.globals["now"] = datetime.utcnow()


# ─── Auth ────────────────────────────────────────────────────────────────────

@router.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("admin/login.html", {"request": request, "error": None})


@router.post("/login")
async def login(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    db: AsyncSession = Depends(get_db),
):
    user = await authenticate_user(db, email, password)
    if not user:
        return templates.TemplateResponse(
            "admin/login.html",
            {"request": request, "error": "E-mail ou senha incorretos."},
            status_code=401,
        )
    token = create_access_token({"sub": user.email})
    response = RedirectResponse(url="/admin/", status_code=302)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,  # set True in production (HTTPS)
    )
    return response


@router.get("/logout")
async def logout():
    response = RedirectResponse(url="/admin/login", status_code=302)
    response.delete_cookie("access_token")
    return response


# ─── Dashboard ────────────────────────────────────────────────────────────────

@router.get("/", response_class=HTMLResponse)
async def dashboard(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    total_articles = (await db.execute(select(func.count()).select_from(Article))).scalar()
    total_published = (await db.execute(select(func.count()).select_from(Article).where(Article.is_published == True))).scalar()
    total_authors = (await db.execute(select(func.count()).select_from(Author))).scalar()
    recent = await get_feed(db, limit=5)

    return templates.TemplateResponse("admin/dashboard.html", {
        "request": request,
        "user": current_user,
        "total_articles": total_articles,
        "total_published": total_published,
        "total_authors": total_authors,
        "recent": recent,
    })


# ─── Articles ─────────────────────────────────────────────────────────────────

@router.get("/artigos", response_class=HTMLResponse)
async def articles_list(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    result = await db.execute(
        select(Article)
        .options(selectinload(Article.author), selectinload(Article.category))
        .order_by(Article.created_at.desc())
    )
    articles = result.scalars().all()
    return templates.TemplateResponse("admin/articles/list.html", {
        "request": request, "user": current_user, "articles": articles
    })


@router.get("/artigos/novo", response_class=HTMLResponse)
async def article_new(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    authors = (await db.execute(select(Author).order_by(Author.name))).scalars().all()
    categories = await get_all_categories(db)
    return templates.TemplateResponse("admin/articles/form.html", {
        "request": request, "user": current_user,
        "article": None, "authors": authors, "categories": categories,
    })


@router.post("/artigos", response_class=HTMLResponse)
async def article_create(
    request: Request,
    title: str = Form(...),
    slug: str = Form(...),
    subtitle: str = Form(""),
    chapeu: str = Form(""),
    body: str = Form(...),
    featured_image_url: str = Form(""),
    reading_time_min: int = Form(1),
    is_published: bool = Form(False),
    author_id: int = Form(...),
    category_id: int = Form(...),
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    article = Article(
        title=title, slug=slug, subtitle=subtitle or None,
        chapeu=chapeu or None, body=body,
        featured_image_url=featured_image_url or None,
        reading_time_min=reading_time_min, is_published=is_published,
        published_at=datetime.utcnow() if is_published else None,
        author_id=author_id, category_id=category_id,
    )
    db.add(article)
    await db.commit()
    return RedirectResponse(url="/admin/artigos", status_code=302)


@router.get("/artigos/{article_id}/editar", response_class=HTMLResponse)
async def article_edit(
    article_id: int,
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    result = await db.execute(
        select(Article).where(Article.id == article_id)
        .options(selectinload(Article.author), selectinload(Article.category))
    )
    article = result.scalars().first()
    if not article:
        raise HTTPException(status_code=404)

    authors = (await db.execute(select(Author).order_by(Author.name))).scalars().all()
    categories = await get_all_categories(db)
    return templates.TemplateResponse("admin/articles/form.html", {
        "request": request, "user": current_user,
        "article": article, "authors": authors, "categories": categories,
    })


@router.post("/artigos/{article_id}/editar")
async def article_update(
    article_id: int,
    title: str = Form(...),
    slug: str = Form(...),
    subtitle: str = Form(""),
    chapeu: str = Form(""),
    body: str = Form(...),
    featured_image_url: str = Form(""),
    reading_time_min: int = Form(1),
    is_published: bool = Form(False),
    author_id: int = Form(...),
    category_id: int = Form(...),
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalars().first()
    if not article:
        raise HTTPException(status_code=404)

    article.title = title
    article.slug = slug
    article.subtitle = subtitle or None
    article.chapeu = chapeu or None
    article.body = body
    article.featured_image_url = featured_image_url or None
    article.reading_time_min = reading_time_min
    article.author_id = author_id
    article.category_id = category_id
    if is_published and not article.is_published:
        article.published_at = datetime.utcnow()
    article.is_published = is_published
    await db.commit()
    return RedirectResponse(url="/admin/artigos", status_code=302)


@router.delete("/artigos/{article_id}", response_class=HTMLResponse)
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
    return HTMLResponse("")  # HTMX remove o elemento com hx-swap="outerHTML"


# ─── Authors ──────────────────────────────────────────────────────────────────

@router.get("/autores", response_class=HTMLResponse)
async def authors_list(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    authors = (await db.execute(select(Author).order_by(Author.name))).scalars().all()
    return templates.TemplateResponse("admin/authors.html", {
        "request": request, "user": current_user, "authors": authors
    })


@router.post("/autores")
async def author_create(
    name: str = Form(...),
    slug: str = Form(...),
    bio: str = Form(""),
    photo_url: str = Form(""),
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    db.add(Author(name=name, slug=slug, bio=bio or None, photo_url=photo_url or None))
    await db.commit()
    return RedirectResponse(url="/admin/autores", status_code=302)


# ─── Categories ───────────────────────────────────────────────────────────────

@router.get("/categorias", response_class=HTMLResponse)
async def categories_list(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    categories = await get_all_categories(db)
    return templates.TemplateResponse("admin/categories.html", {
        "request": request, "user": current_user, "categories": categories
    })


@router.post("/categorias")
async def category_create(
    name: str = Form(...),
    slug: str = Form(...),
    description: str = Form(""),
    db: AsyncSession = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin),
):
    db.add(Category(name=name, slug=slug, description=description or None))
    await db.commit()
    return RedirectResponse(url="/admin/categorias", status_code=302)
