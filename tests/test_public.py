import pytest


@pytest.mark.asyncio
async def test_homepage_returns_200(client, seed_data):
    response = await client.get("/")
    assert response.status_code == 200
    assert "Aurora PE" in response.text


@pytest.mark.asyncio
async def test_article_page_returns_200(client, seed_data):
    slug = seed_data["article"].slug
    response = await client.get(f"/artigo/{slug}")
    assert response.status_code == 200
    assert seed_data["article"].title in response.text


@pytest.mark.asyncio
async def test_article_not_found_returns_404(client, seed_data):
    response = await client.get("/artigo/slug-que-nao-existe")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_category_page_returns_200(client, seed_data):
    slug = seed_data["category"].slug
    response = await client.get(f"/categoria/{slug}")
    assert response.status_code == 200
    assert seed_data["category"].name in response.text


@pytest.mark.asyncio
async def test_search_empty_query(client, seed_data):
    response = await client.get("/busca?q=")
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_search_with_results(client, seed_data):
    response = await client.get("/busca?q=matéria")
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_newsletter_subscribe(client, seed_data):
    response = await client.post("/newsletter", data={"email": "leitor@teste.com"})
    assert response.status_code == 200
    assert "Obrigado" in response.text


@pytest.mark.asyncio
async def test_newsletter_duplicate_subscribe(client, seed_data):
    await client.post("/newsletter", data={"email": "duplicado@teste.com"})
    response = await client.post("/newsletter", data={"email": "duplicado@teste.com"})
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_sitemap_xml(client, seed_data):
    response = await client.get("/sitemap.xml")
    assert response.status_code == 200
    assert "urlset" in response.text
