import type { MetadataRoute } from "next";
import { getArticlesForSitemap, getCategories } from "@/lib/public-api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurorape.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([getArticlesForSitemap(), getCategories()]);

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/artigo/${a.slug}`,
    lastModified: a.published_at ?? undefined,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/categoria/${c.slug}`,
  }));

  return [{ url: SITE_URL }, ...categoryEntries, ...articleEntries];
}
