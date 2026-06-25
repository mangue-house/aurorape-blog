# Aurora PE — Blog

Portal de jornalismo independente de Pernambuco, construído com **FastAPI + HTMX + Jinja2**.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Python 3.11+ / FastAPI |
| Templates | Jinja2 (server-side rendering) |
| Interatividade | HTMX (sem framework JS) |
| Banco de dados | PostgreSQL (produção) / SQLite (testes) |
| ORM | SQLAlchemy 2.0 async |
| Migrations | Alembic |
| Autenticação | JWT em cookie httponly (passlib + python-jose) |
| Estilo | CSS puro com variáveis de marca |

---

## Arquitetura

### Por que FastAPI + HTMX + Jinja2?

O Jinja2 renderiza as páginas no servidor, entregando HTML completo ao navegador — o mesmo resultado de SEO que o Next.js com SSR, mas em Python puro. O HTMX adiciona dinamismo pontual (busca, newsletter, delete inline no admin) sem a necessidade de um framework JavaScript pesado. O resultado é uma aplicação leve, com excelente performance e indexação.

### Fluxo de uma requisição pública

```
Usuário
  │
  ▼
FastAPI (routers/public.py)
  │
  ├── services/article.py   ← queries async no PostgreSQL via SQLAlchemy
  │
  └── Jinja2 Templates      ← renderiza HTML com os dados
        │
        └── HTMX (client)   ← interações dinâmicas pontuais (busca, newsletter)
```

### Fluxo de uma requisição admin

```
Usuário (admin)
  │
  ├── POST /admin/login  →  valida senha (bcrypt)  →  gera JWT  →  seta cookie httponly
  │
  └── GET/POST /admin/*  →  dependencies.py valida o cookie  →  libera a rota
```

---

## Estrutura de pastas

```
aurorape-blog/
├── app/
│   ├── main.py                  # Instância FastAPI, montagem de routers, handler 404
│   ├── config.py                # Settings lidos do .env via python-decouple
│   ├── database.py              # Engine async, SessionLocal, Base declarativa
│   ├── dependencies.py          # get_current_admin — valida JWT do cookie
│   ├── models/
│   │   ├── article.py           # Article, Tag, article_tags (M2M)
│   │   ├── author.py            # Author
│   │   ├── category.py          # Category
│   │   └── user.py              # AdminUser, NewsletterSubscriber
│   ├── schemas/                 # Pydantic schemas (extensível)
│   ├── services/
│   │   ├── article.py           # Queries: hero, feed, busca, relacionados, categorias
│   │   └── auth.py              # JWT encode/decode, bcrypt, authenticate_user
│   ├── routers/
│   │   ├── public.py            # Rotas públicas do blog
│   │   └── admin.py             # Painel administrativo (protegido)
│   └── templates/
│       ├── base.html            # Layout base com head, Open Graph, scripts
│       ├── components/
│       │   ├── header.html      # Header sticky + menu mobile + overlay de busca HTMX
│       │   ├── footer.html      # Rodapé completo com redes sociais e newsletter
│       │   ├── hero.html        # Bloco de destaque principal
│       │   ├── article_card.html
│       │   ├── secondary_grid.html
│       │   └── podcast_player.html
│       ├── public/
│       │   ├── index.html       # Homepage modular
│       │   ├── article.html     # Página de artigo com max-width de leitura
│       │   ├── category.html    # Listagem por editoria
│       │   ├── search.html      # Partial de resultados (alvo HTMX)
│       │   └── 404.html
│       └── admin/
│           ├── base.html        # Layout do painel (sidebar + main)
│           ├── login.html
│           ├── dashboard.html
│           ├── authors.html
│           ├── categories.html
│           └── articles/
│               ├── list.html    # Tabela com delete via HTMX
│               └── form.html    # Formulário criar/editar
├── static/
│   ├── css/main.css             # CSS completo com variáveis de marca
│   ├── js/
│   │   ├── htmx.min.js          # HTMX (baixar manualmente — ver instruções)
│   │   └── app.js               # Menu mobile, ajuste de fonte, copiar link
│   └── images/
│       └── logo.svg             # Logo placeholder (substituir pela arte final)
├── migrations/
│   ├── env.py                   # Configuração Alembic async
│   ├── script.py.mako
│   └── versions/
│       └── 001_initial.py       # Schema completo inicial
├── tests/
│   ├── conftest.py              # Fixtures: DB SQLite, client HTTPX, seed_data
│   ├── test_public.py           # Testes das rotas públicas
│   └── test_admin.py            # Testes do painel admin
├── .env.example
├── .gitignore
├── alembic.ini
├── pyproject.toml
└── requirements.txt
```

---

## Banco de dados

### Modelos

| Modelo | Campos principais |
|---|---|
| `Category` | id, name, slug, description |
| `Author` | id, name, slug, bio, photo_url, social_links (JSON) |
| `Article` | id, title, slug, subtitle, chapeu, body, featured_image_url, author_id, category_id, published_at, reading_time_min, is_published |
| `Tag` | id, name, slug |
| `article_tags` | article_id, tag_id (M2M) |
| `AdminUser` | id, email, hashed_password, is_active |
| `NewsletterSubscriber` | id, email, created_at |

### Diagrama de relacionamentos

```
Category ──< Article >── Author
                │
                └──< article_tags >── Tag
```

---

## Rotas

### Públicas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Homepage com hero, grade de subdestaques e feed |
| GET | `/artigo/{slug}` | Página de artigo completo |
| GET | `/categoria/{slug}` | Feed por editoria com paginação |
| GET | `/busca?q=termo` | Busca (retorna partial HTML via HTMX) |
| POST | `/newsletter` | Inscrição na newsletter (resposta HTMX inline) |
| GET | `/sitemap.xml` | Sitemap dinâmico para SEO |

### Admin (requer autenticação)

| Método | Rota | Descrição |
|---|---|---|
| GET/POST | `/admin/login` | Login com JWT em cookie httponly |
| GET | `/admin/logout` | Logout e remoção do cookie |
| GET | `/admin/` | Dashboard com métricas |
| GET | `/admin/artigos` | Listagem de artigos |
| GET/POST | `/admin/artigos/novo` | Criar artigo |
| GET/POST | `/admin/artigos/{id}/editar` | Editar artigo |
| DELETE | `/admin/artigos/{id}` | Excluir artigo (resposta HTMX) |
| GET/POST | `/admin/autores` | Listar e criar autores |
| GET/POST | `/admin/categorias` | Listar e criar categorias |

---

## Interações HTMX

| Interação | Trigger | Mecanismo |
|---|---|---|
| Busca em tempo real | `keyup delay:400ms` no input | `hx-get="/busca"` → substitui `#search-results` |
| Inscrição newsletter | submit do form | `hx-post="/newsletter"` → substitui `#newsletter-feedback` |
| Excluir artigo (admin) | click no botão | `hx-delete` + `hx-confirm` → remove a `<tr>` com `hx-swap="outerHTML"` |
| Load more no feed | click no botão | `hx-get` com paginação → `hx-swap="beforeend"` no feed |

---

## Identidade visual

As variáveis de marca ficam no topo de `static/css/main.css`. Substitua pelos valores reais da Aurora PE quando disponíveis:

```css
:root {
  --color-primary:    #1A1A2E;   /* substituir */
  --color-secondary:  #E94560;   /* substituir */
  --color-accent:     #F5A623;   /* substituir */
  --color-bg:         #FAFAFA;
  --font-headline: 'Georgia', serif;   /* substituir pela fonte da marca */
  --font-body:     'Inter', sans-serif; /* substituir pela fonte da marca */
}
```

---

## Como rodar o projeto

### Pré-requisitos

- Python 3.11+
- PostgreSQL 14+ (ou apenas SQLite para testes locais)
- pip

### 1. Clonar e configurar o ambiente

```bash
git clone https://github.com/lucaspereira1dev/aurorape-blog.git
cd aurorape-blog

python -m venv .venv

# Linux / macOS
source .venv/bin/activate

# Windows
.venv\Scripts\activate
```

### 2. Instalar dependências

```bash
pip install -r requirements.txt

# ou, com extras de dev (testes):
pip install -e ".[dev]"
```

### 3. Baixar o HTMX

O arquivo HTMX não está incluído no repositório. Baixe e salve em `static/js/htmx.min.js`:

```bash
curl -o static/js/htmx.min.js https://unpkg.com/htmx.org/dist/htmx.min.js
```

### 4. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com seus dados:

```env
DATABASE_URL=postgresql+asyncpg://usuario:senha@localhost:5432/aurorape
SECRET_KEY=gere-uma-chave-longa-e-aleatoria-aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DEBUG=True
SITE_NAME=Aurora PE
SITE_URL=https://aurorape.com.br
```

Para gerar uma `SECRET_KEY` segura:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 5. Criar o banco de dados e rodar migrations

```bash
# Criar o banco no PostgreSQL (se ainda não existir)
createdb aurorape

# Rodar as migrations
alembic upgrade head
```

### 6. Criar o primeiro usuário admin

Abra um shell Python e rode:

```python
import asyncio
from app.database import AsyncSessionLocal
from app.models.user import AdminUser
from app.services.auth import hash_password

async def criar_admin():
    async with AsyncSessionLocal() as db:
        admin = AdminUser(
            email="admin@aurorape.com.br",
            hashed_password=hash_password("sua-senha-aqui")
        )
        db.add(admin)
        await db.commit()
        print("Admin criado!")

asyncio.run(criar_admin())
```

### 7. Iniciar o servidor

```bash
uvicorn app.main:app --reload
```

O site estará disponível em:

- **Blog:** [http://localhost:8000](http://localhost:8000)
- **Admin:** [http://localhost:8000/admin](http://localhost:8000/admin)
- **Sitemap:** [http://localhost:8000/sitemap.xml](http://localhost:8000/sitemap.xml)

---

## Testes

Os testes usam **SQLite em memória** e não precisam do PostgreSQL.

```bash
# Rodar todos os testes
pytest

# Com output detalhado
pytest -v

# Apenas testes públicos
pytest tests/test_public.py -v

# Apenas testes do admin
pytest tests/test_admin.py -v
```

### Cobertura dos testes

| Arquivo | O que testa |
|---|---|
| `test_public.py` | Homepage, artigo, categoria, busca, newsletter, sitemap |
| `test_admin.py` | Login, proteção de rotas, dashboard, listagem de artigos |

---

## Deploy em produção

### Variáveis de ambiente essenciais

```env
DEBUG=False
SECRET_KEY=<chave-longa-e-aleatoria>
DATABASE_URL=postgresql+asyncpg://...
SITE_URL=https://aurorape.com.br
```

### Iniciar com múltiplos workers (Gunicorn + Uvicorn)

```bash
pip install gunicorn

gunicorn app.main:app \
  -w 4 \
  -k uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

### Configuração Nginx (exemplo)

```nginx
server {
    listen 80;
    server_name aurorape.com.br www.aurorape.com.br;

    location /static/ {
        alias /caminho/para/aurorape-blog/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Após configurar o Nginx, habilite HTTPS via Certbot:

```bash
certbot --nginx -d aurorape.com.br -d www.aurorape.com.br
```

Lembre-se também de definir `secure=True` no cookie do admin em `routers/admin.py` quando estiver em produção com HTTPS.

---

## Próximos passos sugeridos

- [ ] Substituir variáveis CSS placeholder pelas cores e fontes reais da Aurora PE
- [ ] Adicionar upload de imagens (AWS S3 ou Cloudflare R2)
- [ ] Integrar editor rico (Tiptap ou Quill) no formulário de artigos do admin
- [ ] Implementar sistema de tags na interface do admin
- [ ] Adicionar paginação infinita (HTMX load more) na homepage
- [ ] Configurar envio de newsletter por e-mail (SendGrid ou Mailgun)
- [ ] Adicionar página de autor com listagem de matérias
- [ ] Implementar cache de página com Redis para artigos populares
