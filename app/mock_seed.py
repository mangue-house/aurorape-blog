import asyncio
from datetime import datetime, timedelta
from app.database import engine, Base, AsyncSessionLocal
from app.models.category import Category
from app.models.author import Author
from app.models.article import Article, Tag
from app.models.user import AdminUser
from app.services.auth import hash_password

async def seed_mock_data():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        # Categories
        categories = [
            Category(name="Política", slug="politica", description="Cobertura política do estado"),
            Category(name="Cultura", slug="cultura", description="A cena cultural pernambucana"),
            Category(name="Educação", slug="educacao", description="O futuro das nossas escolas"),
            Category(name="Cidades", slug="cidades", description="Urbanismo e vida nas cidades"),
            Category(name="Economia", slug="economia", description="O mercado e as finanças locais"),
            Category(name="Esportes", slug="esportes", description="Futebol e outras paixões pernambucanas"),
        ]
        db.add_all(categories)
        await db.flush()

        # Authors
        authors = [
            Author(name="Maria Souza", slug="maria-souza", bio="Jornalista com 10 anos de experiência em política."),
            Author(name="Carlos Lima", slug="carlos-lima", bio="Especialista em cultura e entretenimento."),
            Author(name="Ana Clara", slug="ana-clara", bio="Interessada em urbanismo e sustentabilidade."),
            Author(name="João Mendes", slug="joao-mendes", bio="Repórter de economia e negócios."),
            Author(name="Patrícia Cruz", slug="patricia-cruz", bio="Cronista e amante das tradições locais."),
        ]
        db.add_all(authors)
        await db.flush()

        # Tags
        tags = [
            Tag(name="Recife", slug="recife"),
            Tag(name="Olinda", slug="olinda"),
            Tag(name="Eleições", slug="eleicoes"),
            Tag(name="Inovação", slug="inovacao"),
            Tag(name="Carnaval", slug="carnaval"),
            Tag(name="Educação", slug="educacao-tag"),
        ]
        db.add_all(tags)
        await db.flush()

        # Admin
        admin = AdminUser(email="admin@aurorape.com.br", hashed_password=hash_password("admin123"))
        db.add(admin)

        # Articles
        articles_data = [
            {
                "title": "Os desafios da política em Pernambuco para 2026",
                "slug": "desafios-politica-pernambuco-2026",
                "subtitle": "Análise profunda sobre o cenário eleitoral que se aproxima.",
                "chapeu": "Eleições 2026",
                "body": "<p>A política em Pernambuco sempre foi um terreno fértil para grandes debates. Com a aproximação de 2026, as peças começam a se mover no tabuleiro.</p><p>Especialistas apontam que a fragmentação partidária pode ser um dos maiores desafios para os novos candidatos.</p>",
                "author_id": authors[0].id,
                "category_id": categories[0].id,
                "featured_image_url": "https://picsum.photos/seed/pol/1200/600",
                "tags": [tags[0], tags[2]],
            },
            {
                "title": "Carnaval de Olinda: Tradição que se renova",
                "slug": "carnaval-olinda-tradicao-renova",
                "subtitle": "Como os bonecos gigantes e o frevo continuam atraindo multidões.",
                "chapeu": "Cultura",
                "body": "<p>As ladeiras de Olinda já sentem o cheiro do frevo. O Carnaval de Olinda não é apenas uma festa, é um patrimônio que se reinventa a cada ano.</p><p>Este ano, novos blocos prometem trazer ainda mais cor para a Cidade Alta.</p>",
                "author_id": authors[1].id,
                "category_id": categories[1].id,
                "featured_image_url": "https://picsum.photos/seed/cul/1200/600",
                "tags": [tags[1], tags[4]],
            },
            {
                "title": "A importância do Recife Antigo para a tecnologia",
                "slug": "recife-antigo-tecnologia-porto-digital",
                "subtitle": "O Porto Digital e seu impacto na economia local.",
                "chapeu": "Inovação",
                "body": "<p>O Porto Digital transformou o Recife Antigo em um dos maiores hubs de tecnologia do Brasil.</p><p>Empresas globais agora dividem espaço com startups locais em um ecossistema vibrante.</p>",
                "author_id": authors[2].id,
                "category_id": categories[4].id,
                "featured_image_url": "https://picsum.photos/seed/tech/1200/600",
                "tags": [tags[0], tags[3]],
            },
            {
                "title": "Educação inclusiva: Novas diretrizes para escolas públicas",
                "slug": "educacao-inclusiva-escolas-publicas",
                "subtitle": "O que muda no currículo e na infraestrutura das escolas.",
                "chapeu": "Educação",
                "body": "<p>A inclusão é o pilar da nova reforma educacional. Garantir que todos os alunos tenham acesso a uma educação de qualidade é a meta prioritária.</p>",
                "author_id": authors[0].id,
                "category_id": categories[2].id,
                "featured_image_url": "https://picsum.photos/seed/edu/1200/600",
                "tags": [tags[5]],
            },
            {
                "title": "A revitalização do Rio Capibaribe",
                "slug": "revitalizacao-rio-capibaribe",
                "subtitle": "Projetos buscam integrar o rio de volta à rotina dos recifenses.",
                "chapeu": "Cidades",
                "body": "<p>O Rio Capibaribe é a alma do Recife. Projetos de despoluição e novos parques lineares estão mudando a cara da cidade.</p>",
                "author_id": authors[2].id,
                "category_id": categories[3].id,
                "featured_image_url": "https://picsum.photos/seed/river/1200/600",
                "tags": [tags[0]],
            },
            {
                "title": "Porto Digital atrai R$ 200 milhões em novos investimentos",
                "slug": "porto-digital-investimentos-200-milhoes",
                "subtitle": "Novas startups de IA estão ancorando no bairro histórico.",
                "chapeu": "Economia",
                "body": "<p>O ecossistema de tecnologia de Pernambuco dá um novo salto. Os investimentos focam em inteligência artificial e sustentabilidade.</p>",
                "author_id": authors[3].id,
                "category_id": categories[4].id,
                "featured_image_url": "https://picsum.photos/seed/invest/1200/600",
                "tags": [tags[0], tags[3]],
            },
            {
                "title": "Sport, Santa Cruz e Náutico: O futuro dos clássicos",
                "slug": "futuro-classicos-pernambuco-sport-santa-nautico",
                "subtitle": "Como os clubes estão se preparando para as novas ligas nacionais.",
                "chapeu": "Esportes",
                "body": "<p>A rivalidade continua forte, mas os bastidores buscam união para fortalecer o futebol pernambucano no cenário nacional.</p>",
                "author_id": authors[4].id,
                "category_id": categories[5].id,
                "featured_image_url": "https://picsum.photos/seed/futebol/1200/600",
                "tags": [tags[0]],
            },
            {
                "title": "Culinária de Pernambuco: Além do Bolo de Rolo",
                "slug": "culinaria-pernambuco-alem-bolo-rolo",
                "subtitle": "Chefes locais resgatam ingredientes ancestrais.",
                "chapeu": "Cultura",
                "body": "<p>A gastronomia pernambucana é um mosaico de sabores. Novos restaurantes no Recife Antigo estão apostando na cozinha de raiz.</p>",
                "author_id": authors[1].id,
                "category_id": categories[1].id,
                "featured_image_url": "https://picsum.photos/seed/food/1200/600",
                "tags": [tags[0]],
            },
            {
                "title": "Mobilidade urbana: O desafio das bicicletas",
                "slug": "mobilidade-urbana-desafio-bicicletas-recife",
                "subtitle": "Ciclovias avançam, mas segurança ainda preocupa ciclistas.",
                "chapeu": "Cidades",
                "body": "<p>O Recife tenta se tornar uma cidade mais ciclável. O plano diretor prevê a expansão das rotas, mas a convivência com os carros é tensa.</p>",
                "author_id": authors[2].id,
                "category_id": categories[3].id,
                "featured_image_url": "https://picsum.photos/seed/bike/1200/600",
                "tags": [tags[0]],
            },
            {
                "title": "Prefeitura anuncia novos concursos para Educação",
                "slug": "prefeitura-novos-concursos-educacao",
                "subtitle": "Mais de 500 vagas para professores em diversas áreas.",
                "chapeu": "Serviço Público",
                "body": "<p>A rede municipal de ensino terá um reforço significativo no próximo ano. As inscrições começam em outubro.</p>",
                "author_id": authors[0].id,
                "category_id": categories[2].id,
                "featured_image_url": "https://picsum.photos/seed/school/1200/600",
                "tags": [tags[5]],
            },
            {
                "title": "O impacto do 5G nas cidades do interior",
                "slug": "impacto-5g-cidades-interior-pernambuco",
                "subtitle": "Conectividade está mudando o agronegócio e a educação remota.",
                "chapeu": "Tecnologia",
                "body": "<p>Do sertão ao agreste, o 5G começa a dar seus primeiros passos, reduzindo distâncias digitais.</p>",
                "author_id": authors[3].id,
                "category_id": categories[4].id,
                "featured_image_url": "https://picsum.photos/seed/5g/1200/600",
                "tags": [tags[3]],
            },
            {
                "title": "Teatro de Santa Isabel: Um palco de história",
                "slug": "teatro-santa-isabel-palco-historia",
                "subtitle": "A importância da preservação dos monumentos históricos do Recife.",
                "chapeu": "Patrimônio",
                "body": "<p>O Teatro de Santa Isabel continua sendo o coração da arte dramática em Pernambuco. Suas colunas contam séculos de história.</p>",
                "author_id": authors[4].id,
                "category_id": categories[1].id,
                "featured_image_url": "https://picsum.photos/seed/teatro/1200/600",
                "tags": [tags[0]],
            },
            {
                "title": "Novas usinas solares no Sertão",
                "slug": "novas-usinas-solares-sertao-pernambuco",
                "subtitle": "Energia limpa se torna a nova vocação econômica da região.",
                "chapeu": "Sustentabilidade",
                "body": "<p>O sol do sertão agora gera riqueza e sustentabilidade. Grandes parques solares estão sendo instalados, gerando empregos verdes.</p>",
                "author_id": authors[3].id,
                "category_id": categories[4].id,
                "featured_image_url": "https://picsum.photos/seed/sun/1200/600",
                "tags": [tags[3]],
            },
        ]

        now = datetime.utcnow()
        for i, data in enumerate(articles_data):
            tags_to_add = data.pop("tags", [])
            article = Article(
                **data,
                is_published=True,
                published_at=now - timedelta(days=i, hours=i),
                reading_time_min=2 + (i % 5),
            )
            article.tags = tags_to_add
            db.add(article)

        await db.commit()
