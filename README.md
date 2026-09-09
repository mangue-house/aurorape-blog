# Aurora PE — Blog

Portal de jornalismo independente de Pernambuco. Monorepo com frontend em **Next.js** e API headless em **FastAPI**.

---

## Estrutura

```
aurorape-blog/
├── frontend/   # Next.js (App Router) — site público + painel admin
└── backend/    # FastAPI — API JSON, JWT em cookie httponly, SQLAlchemy async
```

Cada pasta é implantada como um serviço/projeto separado (frontend na Vercel, backend em Render/Railway) — veja o `README`/`.env.example` de cada uma para detalhes específicos.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16 (App Router, React 19) |
| Backend | Python 3.11+ / FastAPI |
| Banco de dados | PostgreSQL (produção) / SQLite (local, testes, modo mock) |
| ORM | SQLAlchemy 2.0 async |
| Migrations | Alembic |
| Autenticação | JWT em cookie httponly (passlib + python-jose) |

---

## Rodando localmente

### Backend

```bash
cd backend
python -m venv .venv && source .venv/Scripts/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env   # ajuste os valores, ou use MOCK_MODE=true pra rodar sem Postgres
uvicorn app.main:app --reload
```

Com `MOCK_MODE=true`, o backend sobe com SQLite em memória e já semeia dados de exemplo (incluindo um usuário admin — ver `backend/app/mock_seed.py`), sem precisar de banco real.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # aponte para a URL do backend local
npm run dev
```

---

## Deploy

- **Frontend**: Vercel — Root Directory `frontend`, framework Next.js detectado automaticamente.
- **Backend**: qualquer serviço que builde a partir de `backend/Dockerfile` (Render, Railway, etc.) — o Dockerfile já roda as migrations (`alembic upgrade head`) no start e respeita a variável `PORT` do ambiente.

Variáveis de ambiente de cada lado estão documentadas em `backend/.env.example` e `frontend/.env.example`.
