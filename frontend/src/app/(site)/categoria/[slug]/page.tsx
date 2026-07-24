import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryArticles } from "@/lib/public-api";
import ArticleCard from "@/components/ArticleCard";
import LoadMoreFeed from "@/components/LoadMoreFeed";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} — Aurora PE`,
    description: `Todas as matérias de ${category.name} no Aurora PE.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam ?? "1") || 1;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const { items: articles } = await getCategoryArticles(slug, page);

  const mosaic = articles.slice(0, 3);
  const rest = articles.slice(3);

  return (
    <div className="container">
      <header className="category-hero">
        <span className="category-hero__label">Editoria</span>
        <h1 className="category-hero__name">{category.name}</h1>
        {category.description && <p className="category-hero__desc">{category.description}</p>}
      </header>

      {articles.length > 0 ? (
        <>
          <section aria-label={`Destaques de ${category.name}`} className="category-mosaic">
            {mosaic.map((article) => (
              <ArticleCard key={article.id} article={article} variant="editorial" />
            ))}
          </section>

          {rest.length > 0 && (
            <>
              <div className="section-heading mt-4">
                <div className="section-heading__bar" aria-hidden="true" />
                <span className="section-heading__text">Mais em {category.name}</span>
              </div>
              <LoadMoreFeed categorySlug={slug} initialItems={rest} initialPage={page} pageSize={12} />
            </>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2.5rem" }}>
            {page > 1 && (
              <Link href={`/categoria/${slug}?page=${page - 1}`} className="btn-subscribe" style={{ background: "var(--color-primary)" }}>
                ← Anterior
              </Link>
            )}
            {articles.length >= 12 && (
              <Link href={`/categoria/${slug}?page=${page + 1}`} className="btn-subscribe" style={{ background: "var(--color-primary)" }}>
                Próxima →
              </Link>
            )}
          </div>
        </>
      ) : (
        <p style={{ color: "var(--color-muted)", textAlign: "center", padding: "3rem 0" }}>
          Nenhuma matéria encontrada nesta editoria.
        </p>
      )}
    </div>
  );
}
