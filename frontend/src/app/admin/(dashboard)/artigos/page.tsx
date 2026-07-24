import Link from "next/link";
import { getAdminToken } from "@/lib/auth";
import { listArticles } from "@/lib/admin-api";
import { formatDate } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteArticleAction } from "./actions";

export const metadata = { title: "Artigos — Aurora PE Admin" };

export default async function AdminArticlesPage() {
  const token = (await getAdminToken())!;
  const articles = await listArticles(token);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">Admin / Conteúdo</p>
          <h1>Matérias</h1>
        </div>
        <Link href="/admin/artigos/novo" className="btn-primary">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nova matéria
        </Link>
      </div>

      <div className="admin-body">
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Data</th>
                <th style={{ width: 100 }} />
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr key={article.id} id={`article-row-${article.id}`}>
                    <td style={{ maxWidth: 360 }}>
                      <div style={{ fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{article.title}</div>
                      <div className="table-slug">/{article.slug}</div>
                    </td>
                    <td style={{ color: "rgba(255,255,255,0.6)" }}>{article.author.name}</td>
                    <td>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {article.category.name}
                      </span>
                    </td>
                    <td>
                      {article.is_published ? (
                        <span className="badge badge-green">Publicado</span>
                      ) : (
                        <span className="badge badge-gray">Rascunho</span>
                      )}
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>
                      {formatDate(article.published_at) || "—"}
                    </td>
                    <td>
                      <div className="table-actions">
                        <a href={`/artigo/${article.slug}`} target="_blank" rel="noopener" className="btn-icon" title="Ver no site">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                        <Link href={`/admin/artigos/${article.id}/editar`} className="btn-icon" title="Editar">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </Link>
                        <DeleteButton
                          confirmMessage={`Excluir '${article.title}'?`}
                          onDelete={deleteArticleAction.bind(null, article.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", padding: "3.5rem" }}>
                    Nenhuma matéria cadastrada.
                    <Link href="/admin/artigos/novo" style={{ color: "var(--color-secondary)", fontWeight: 600, marginLeft: "0.5rem" }}>
                      Criar a primeira →
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
