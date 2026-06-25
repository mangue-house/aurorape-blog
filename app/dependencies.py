from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import AdminUser
from app.services.auth import decode_token


async def get_current_admin(
    access_token: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
) -> AdminUser:
    credentials_exception = HTTPException(
        status_code=status.HTTP_302_FOUND,
        headers={"Location": "/admin/login"},
    )
    if not access_token:
        raise credentials_exception

    payload = decode_token(access_token)
    if not payload:
        raise credentials_exception

    email: str = payload.get("sub")
    if not email:
        raise credentials_exception

    result = await db.execute(
        select(AdminUser).where(AdminUser.email == email, AdminUser.is_active == True)
    )
    user = result.scalars().first()
    if not user:
        raise credentials_exception
    return user
