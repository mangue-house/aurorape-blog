import pytest


@pytest.mark.asyncio
async def test_admin_login_page(client):
    response = await client.get("/admin/login")
    assert response.status_code == 200
    assert "Login" in response.text or "Entrar" in response.text


@pytest.mark.asyncio
async def test_admin_redirect_without_auth(client):
    response = await client.get("/admin/", follow_redirects=False)
    assert response.status_code == 302
    assert "/admin/login" in response.headers.get("location", "")


@pytest.mark.asyncio
async def test_admin_login_invalid(client, seed_data):
    response = await client.post(
        "/admin/login",
        data={"email": "admin@aurorape.com", "password": "errada"},
        follow_redirects=False,
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_admin_login_valid(client, seed_data):
    response = await client.post(
        "/admin/login",
        data={"email": "admin@aurorape.com", "password": "senha123"},
        follow_redirects=False,
    )
    assert response.status_code == 302
    assert "access_token" in response.cookies


@pytest.mark.asyncio
async def test_admin_dashboard_after_login(client, seed_data):
    login = await client.post(
        "/admin/login",
        data={"email": "admin@aurorape.com", "password": "senha123"},
        follow_redirects=True,
    )
    assert login.status_code == 200
    assert "Dashboard" in login.text


@pytest.mark.asyncio
async def test_admin_articles_list(client, seed_data):
    await client.post(
        "/admin/login",
        data={"email": "admin@aurorape.com", "password": "senha123"},
    )
    response = await client.get("/admin/artigos")
    assert response.status_code == 200
    assert "Artigos" in response.text
