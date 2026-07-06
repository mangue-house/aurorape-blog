import pytest


@pytest.mark.asyncio
async def test_admin_login_invalid(client, seed_data):
    response = await client.post(
        "/api/v1/admin/auth/login",
        json={"email": "admin@aurorape.com", "password": "errada"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_admin_login_valid(client, seed_data):
    response = await client.post(
        "/api/v1/admin/auth/login",
        json={"email": "admin@aurorape.com", "password": "senha123"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


@pytest.mark.asyncio
async def test_admin_dashboard(auth_client, seed_data):
    response = await auth_client.get("/api/v1/admin/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert data["total_articles"] == 1
    assert data["total_authors"] == 1


@pytest.mark.asyncio
async def test_admin_articles_list(auth_client, seed_data):
    response = await auth_client.get("/api/v1/admin/articles")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Primeira matéria de teste"


@pytest.mark.asyncio
async def test_admin_article_create(auth_client, seed_data):
    payload = {
        "title": "Nova Matéria Admin",
        "slug": "nova-materia-admin",
        "subtitle": "Subtítulo",
        "chapeu": "Geral",
        "body": "<p>Conteúdo novo</p>",
        "author_id": seed_data["author"].id,
        "category_id": seed_data["category"].id,
        "is_published": True
    }
    response = await auth_client.post("/api/v1/admin/articles", json=payload)
    assert response.status_code == 201
    assert response.json()["title"] == "Nova Matéria Admin"


@pytest.mark.asyncio
async def test_admin_article_update(auth_client, seed_data):
    article_id = seed_data["article"].id
    payload = {
        "title": "Título Atualizado",
        "slug": "titulo-atualizado",
        "subtitle": "Novo sub",
        "chapeu": "Editado",
        "body": "<p>Corpo atualizado</p>",
        "author_id": seed_data["author"].id,
        "category_id": seed_data["category"].id,
        "is_published": True
    }
    response = await auth_client.put(f"/api/v1/admin/articles/{article_id}", json=payload)
    assert response.status_code == 200
    assert response.json()["title"] == "Título Atualizado"


@pytest.mark.asyncio
async def test_admin_article_delete(auth_client, seed_data):
    article_id = seed_data["article"].id
    response = await auth_client.delete(f"/api/v1/admin/articles/{article_id}")
    assert response.status_code == 204
