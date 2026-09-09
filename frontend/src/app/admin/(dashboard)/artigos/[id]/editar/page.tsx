import Link from "next/link";
import { requireAdminToken } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { getArticleById, listAuthors, listCategoriesAdmin } from "@/lib/admin-api";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateArticleAction } from "../../actions";

export const metadata = { title: "Editar matéria — Aurora PE Admin" };

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await requireAdminToken();

  let article = null;
  try {
    article = await getArticleById(token, id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      article = null;
    } else {
      throw err;
    }
  }

  if (!article) {
    return (
      <div className="admin-body" style={{ maxWidth: 600, margin: "3rem auto" }}>
        <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📄</div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Matéria não encontrada</h2>
          <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
            A matéria com identificador <strong>{id}</strong> não foi encontrada ou foi excluída.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <Link href="/admin" className="btn-primary">
              ← Voltar para Matérias
            </Link>
            <Link href="/admin/artigos/novo" className="btn-secondary">
              Nova matéria
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const [categories, authors] = await Promise.all([listCategoriesAdmin(token), listAuthors(token)]);

  return (
    <ArticleForm
      mode="edit"
      article={article}
      categories={categories}
      authors={authors}
      action={updateArticleAction.bind(null, article.id)}
    />
  );
}
