import { getAdminToken } from "@/lib/auth";
import { listAuthors } from "@/lib/admin-api";
import AuthorCreateForm from "@/components/admin/AuthorCreateForm";

export const metadata = { title: "Autores — Aurora PE Admin" };

export default async function AdminAuthorsPage() {
  const token = (await getAdminToken())!;
  const authors = await listAuthors(token);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">Admin / Cadastros</p>
          <h1>Autores</h1>
        </div>
      </div>

      <div className="admin-body">
        <div className="card">
          <AuthorCreateForm />

          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Slug</th>
                <th>Bio</th>
                <th style={{ width: 80 }} />
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author) => (
                  <tr key={author.id} id={`author-row-${author.id}`}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {author.photo_url ? (
                          <img
                            src={author.photo_url}
                            alt={author.name}
                            style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              background: "rgba(233,69,96,0.18)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              fontWeight: 700,
                              fontSize: "0.85rem",
                              color: "var(--color-secondary)",
                            }}
                          >
                            {author.name[0]?.toUpperCase()}
                          </div>
                        )}
                        <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>{author.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="table-slug" style={{ maxWidth: "none" }}>
                        {author.slug}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", maxWidth: 300 }}>
                      <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {author.bio || "—"}
                      </span>
                    </td>
                    <td />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", padding: "3rem" }}>
                    Nenhum autor cadastrado ainda.
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
