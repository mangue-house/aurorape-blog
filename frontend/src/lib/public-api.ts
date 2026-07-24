import { apiGet, apiPost } from "./api";
import type {
  ArticleListItem,
  ArticleOut,
  AuthorOut,
  CategoryOut,
  HomeResponse,
  NewsletterSubscribeResponse,
  PaginatedResponse,
} from "./types";

export function getHome() {
  return apiGet<HomeResponse>("/home", { revalidate: 60 });
}

export function getCategories() {
  return apiGet<CategoryOut[]>("/categories", { revalidate: 300 });
}

export function getCategoryArticles(slug: string, page = 1) {
  return apiGet<PaginatedResponse<ArticleListItem>>(
    `/categories/${slug}/articles?page=${page}`,
    { revalidate: 60 }
  );
}

export function getArticlesForSitemap(limit = 1000) {
  return apiGet<ArticleListItem[]>(`/articles?limit=${limit}`, { revalidate: 3600 });
}

export function getArticle(slug: string) {
  return apiGet<ArticleOut>(`/articles/${slug}`, { revalidate: 60 });
}

export function getRelated(slug: string) {
  return apiGet<ArticleListItem[]>(`/articles/${slug}/related`, { revalidate: 60 });
}

export function getAuthor(slug: string) {
  return apiGet<AuthorOut>(`/authors/${slug}`, { revalidate: 300 });
}

export function search(q: string) {
  return apiGet<ArticleListItem[]>(`/search?q=${encodeURIComponent(q)}`);
}

export function subscribeNewsletter(email: string) {
  return apiPost<NewsletterSubscribeResponse>("/newsletter", { email });
}
