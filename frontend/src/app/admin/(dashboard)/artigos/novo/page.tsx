import { getAdminToken } from "@/lib/auth";
import { listAuthors, listCategoriesAdmin } from "@/lib/admin-api";
import ArticleForm from "@/components/admin/ArticleForm";
import { createArticleAction } from "../actions";

export const metadata = { title: "Nova matéria — Aurora PE Admin" };

export default async function NewArticlePage() {
  const token = (await getAdminToken())!;
  const [categories, authors] = await Promise.all([listCategoriesAdmin(token), listAuthors(token)]);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">
            <a href="/admin/artigos" style={{ color: "var(--color-muted)" }}>
              Matérias
            </a>{" "}
            / Nova
          </p>
          <h1>Nova matéria</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button type="submit" form="article-form" className="btn-primary">
            Publicar
          </button>
        </div>
      </div>

      <div className="admin-body">
        <ArticleForm categories={categories} authors={authors} action={createArticleAction} />
      </div>
    </>
  );
}
