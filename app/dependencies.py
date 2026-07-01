from app.models.user import AdminUser


async def get_current_admin() -> AdminUser:
    # Auth bypassed for demo — remove this and restore the original before going to production
    user = AdminUser()
    user.email = "demo@aurorape.com.br"
    user.name = "Demo"
    user.is_active = True
    return user
