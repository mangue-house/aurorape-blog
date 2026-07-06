from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import AdminUser
from app.services.auth import decode_token

bearer_scheme = HTTPBearer(auto_error=False)


async def get_current_admin(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> AdminUser:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Não autenticado")

    payload = decode_token(credentials.credentials)
    email = payload.get("sub") if payload else None
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

    result = await db.execute(select(AdminUser).where(AdminUser.email == email))
    user = result.scalars().first()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário inválido")

    return user
