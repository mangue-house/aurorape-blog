import { requireAdminToken } from "@/lib/auth";
import { listCategoriesAdmin } from "@/lib/admin-api";
import CategoryCreateForm from "@/components/admin/CategoryCreateForm";

export const metadata = { title: "Categorias — Aurora PE Admin" };

export default async function AdminCategoriesPage() {
  const token = await requireAdminToken();
  const categories = await listCategoriesAdmin(token);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">Admin / Cadastros</p>
          <h1>Categorias</h1>
        </div>
      </div>

      <div className="admin-body">
        <div className="card">
          <CategoryCreateForm />

          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Slug</th>
                <th>Descrição</th>
                <th style={{ width: 100 }} />
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id} id={`cat-row-${cat.id}`}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-secondary)", flexShrink: 0, display: "inline-block" }} />
                        <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>{cat.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="table-slug" style={{ maxWidth: "none" }}>
                        {cat.slug}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", maxWidth: 300 }}>{cat.description || "—"}</td>
                    <td>
                      <div className="table-actions">
                        <a href={`/categoria/${cat.slug}`} target="_blank" className="btn-icon" title="Ver no site">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", padding: "3rem" }}>
                    Nenhuma categoria cadastrada.
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
