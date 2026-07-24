"""Cria (ou atualiza a senha de) o primeiro usuário admin em produção.

Uso:
    ADMIN_EMAIL=redacao@aurorape.com.br ADMIN_PASSWORD=troque-isto python create_admin.py

Pensado para rodar como comando one-off no Railway (ou qualquer ambiente),
já que não existe fluxo de auto-cadastro para o painel /admin.
"""

import asyncio
import os
import sys

from sqlalchemy import select

from app.database import AsyncSessionLocal
from app.models.user import AdminUser
from app.services.auth import hash_password


async def main() -> None:
    email = os.environ.get("ADMIN_EMAIL")
    password = os.environ.get("ADMIN_PASSWORD")

    if not email or not password:
        print("Defina ADMIN_EMAIL e ADMIN_PASSWORD nas variáveis de ambiente.", file=sys.stderr)
        sys.exit(1)

    async with AsyncSessionLocal() as db:
        result = await db.execute(select(AdminUser).where(AdminUser.email == email))
        user = result.scalars().first()

        if user:
            user.hashed_password = hash_password(password)
            user.is_active = True
            await db.commit()
            print(f"Senha atualizada para admin existente: {email}")
        else:
            db.add(AdminUser(email=email, hashed_password=hash_password(password), is_active=True))
            await db.commit()
            print(f"Admin criado: {email}")


if __name__ == "__main__":
    asyncio.run(main())
