import Link from "next/link";
import { requireAdminToken } from "@/lib/auth";
import { listAuthors } from "@/lib/admin-api";
import AuthorCreateForm from "@/components/admin/AuthorCreateForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteAuthorAction } from "./actions";

export const metadata = { title: "Colaboradores — Aurora PE Admin" };

export default async function AdminUsersPage() {
  const token = await requireAdminToken();
  const authors = await listAuthors(token);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">Admin / Cadastros</p>
          <h1>Colaboradores</h1>
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
                <th>Role</th>
                <th>Email</th>
                <th>Bio</th>
                <th style={{ width: 90 }} />
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
                        <span style={{ fontWeight: 600, color: "var(--color-text)" }}>{author.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="table-slug" style={{ maxWidth: "none" }}>
                        {author.slug}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "var(--color-muted)" }}>{author.role || "—"}</td>
                    <td style={{ fontSize: "0.82rem", color: "var(--color-muted)" }}>{author.email || "—"}</td>
                    <td style={{ fontSize: "0.82rem", color: "var(--color-muted)", maxWidth: 300 }}>
                      <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {author.bio || "—"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link href={`/admin/users/${author.id}/editar`} className="btn-icon" title="Editar">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </Link>
                        <DeleteButton
                          confirmMessage={`Excluir '${author.name}'?`}
                          onDelete={deleteAuthorAction.bind(null, author.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "var(--color-muted)", padding: "3rem" }}>
                    Nenhum colaborador cadastrado ainda.
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
