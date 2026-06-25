from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.database import engine
from app.models import *  # noqa: F401,F403 — garante registro dos modelos
from app.routers.public import router as public_router
from app.routers.admin import router as admin_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await engine.dispose()


app = FastAPI(
    title="Aurora PE",
    description="Portal de jornalismo independente de Pernambuco",
    version="0.1.0",
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(public_router)
app.include_router(admin_router)

templates = Jinja2Templates(directory="app/templates")


@app.exception_handler(404)
async def not_found(request: Request, exc):
    return templates.TemplateResponse(
        "public/404.html",
        {"request": request},
        status_code=404,
    )
