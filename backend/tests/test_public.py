import pytest


@pytest.mark.asyncio
async def test_api_home(client, seed_data):
    response = await client.get("/api/v1/home")
    assert response.status_code == 200
    data = response.json()
    assert "hero" in data
    assert "secondary" in data
    assert "feed" in data
    assert data["hero"]["title"] == "Primeira matéria de teste"


@pytest.mark.asyncio
async def test_api_categories(client, seed_data):
    response = await client.get("/api/v1/categories")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["slug"] == "politica"
    assert "article_count" in data[0]
    assert data[0]["article_count"] >= 1


@pytest.mark.asyncio
async def test_api_category_articles(client, seed_data):
    response = await client.get("/api/v1/categories/politica/articles")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert len(data["items"]) > 0


@pytest.mark.asyncio
async def test_api_article_detail(client, seed_data):
    slug = seed_data["article"].slug
    response = await client.get(f"/api/v1/articles/{slug}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == seed_data["article"].title
    assert data["author"]["name"] == "João Silva"


@pytest.mark.asyncio
async def test_api_article_not_found(client, seed_data):
    response = await client.get("/api/v1/articles/nao-existe")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_api_author_detail(client, seed_data):
    slug = seed_data["author"].slug
    response = await client.get(f"/api/v1/authors/{slug}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "João Silva"


@pytest.mark.asyncio
async def test_api_search(client, seed_data):
    response = await client.get("/api/v1/search?q=teste")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["title"] == "Primeira matéria de teste"


@pytest.mark.asyncio
async def test_api_newsletter_subscribe(client, seed_data):
    response = await client.post("/api/v1/newsletter", json={"email": "novo@leitor.com"})
    assert response.status_code == 200
    assert "message" in response.json()
