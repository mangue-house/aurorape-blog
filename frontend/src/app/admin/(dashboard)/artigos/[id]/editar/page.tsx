import { notFound } from "next/navigation";
import { getAdminToken } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { getArticleById, listAuthors, listCategoriesAdmin } from "@/lib/admin-api";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateArticleAction } from "../../actions";

export const metadata = { title: "Editar matéria — Aurora PE Admin" };

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = (await getAdminToken())!;

  let article;
  try {
    [article] = await Promise.all([getArticleById(token, Number(id))]);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const [categories, authors] = await Promise.all([listCategoriesAdmin(token), listAuthors(token)]);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">
            <a href="/admin" style={{ color: "var(--color-muted)" }}>
              Matérias
            </a>{" "}
            / Editar
          </p>
          <h1>Editar matéria</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a href={`/artigo/${article.slug}`} target="_blank" className="btn-secondary">
            Ver no site ↗
          </a>
          <button type="submit" form="article-form" className="btn-primary">
            Salvar
          </button>
        </div>
      </div>

      <div className="admin-body">
        <ArticleForm article={article} categories={categories} authors={authors} action={updateArticleAction.bind(null, article.id)} />
      </div>
    </>
  );
}
