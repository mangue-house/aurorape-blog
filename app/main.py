import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from app.config import MOCK_MODE
from app.database import engine
from app.models import *  # noqa: F401,F403 — garante registro dos modelos
from app.routers.public import router as public_router
from app.routers.admin import router as admin_router
from app.mock_seed import seed_mock_data

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@asynccontextmanager
async def lifespan(app: FastAPI):
    if MOCK_MODE:
        await seed_mock_data()
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

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

app.include_router(public_router)
app.include_router(admin_router)

templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "app", "templates"))


@app.get("/debug-dir")
async def debug_dir():
    app_dir = os.path.join(BASE_DIR, "app")
    templates_dir = os.path.join(BASE_DIR, "app", "templates")
    static_dir = os.path.join(BASE_DIR, "static")
    
    def safe_listdir(p):
        try:
            return os.listdir(p)
        except Exception as e:
            return str(e)
            
    return {
        "BASE_DIR": BASE_DIR,
        "app_contents": safe_listdir(app_dir),
        "templates_contents": safe_listdir(templates_dir),
        "static_contents": safe_listdir(static_dir)
    }

@app.exception_handler(404)
async def not_found(request: Request, exc):
    return templates.TemplateResponse(
        request=request,
        name="public/404.html",
        status_code=404,
    )


@app.get("/health")
async def health_check():
    return {"status": "ok"}

