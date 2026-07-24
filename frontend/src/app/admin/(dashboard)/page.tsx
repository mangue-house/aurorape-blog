import Link from "next/link";
import { getAdminToken } from "@/lib/auth";
import { getDashboard } from "@/lib/admin-api";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Dashboard — Aurora PE Admin" };

export default async function AdminDashboardPage() {
  const token = (await getAdminToken())!;
  const { total_articles, total_published, total_authors, recent } = await getDashboard(token);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">Aurora PE Admin</p>
          <h1>Dashboard</h1>
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
        <div className="stat-cards">
          <div className="stat-card stat-card--primary">
            <div className="stat-card__value">{total_articles}</div>
            <div className="stat-card__label">Total de matérias</div>
          </div>
          <div className="stat-card stat-card--green">
            <div className="stat-card__value">{total_published}</div>
            <div className="stat-card__label">Publicadas</div>
          </div>
          <div className="stat-card stat-card--red">
            <div className="stat-card__value">{total_articles - total_published}</div>
            <div className="stat-card__label">Rascunhos</div>
          </div>
          <div className="stat-card stat-card--accent">
            <div className="stat-card__value">{total_authors}</div>
            <div className="stat-card__label">Autores</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-header__title">Publicações recentes</span>
            <Link href="/admin/artigos" style={{ fontSize: "0.75rem", color: "var(--color-secondary)" }}>
              Ver todas →
            </Link>
          </div>

          {recent.length > 0 ? (
            recent.map((article) => (
              <Link key={article.id} href={`/admin/artigos/${article.id}/editar`} className="recent-row">
                <div style={{ flexShrink: 0 }}>
                  {article.is_published ? (
                    <span className="badge badge-green">Pub</span>
                  ) : (
                    <span className="badge badge-gray">Rascunho</span>
                  )}
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div className="recent-row__title">{article.title}</div>
                  {article.chapeu && (
                    <div
                      style={{
                        fontSize: "0.68rem",
                        color: "var(--color-accent)",
                        fontWeight: 700,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        marginTop: "0.1rem",
                      }}
                    >
                      {article.chapeu}
                    </div>
                  )}
                </div>
                <div className="recent-row__author">{article.author.name}</div>
                <div className="recent-row__date">{formatDate(article.published_at, { day: "2-digit", month: "2-digit", year: "2-digit" })}</div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))
          ) : (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.28)" }}>
              Nenhum artigo ainda.
              <Link href="/admin/artigos/novo" style={{ color: "var(--color-secondary)", marginLeft: "0.4rem" }}>
                Criar a primeira matéria →
              </Link>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem", marginTop: "1.5rem" }}>
          <Link href="/admin/artigos/novo" className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.875rem", textDecoration: "none", color: "inherit" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--color-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>Nova matéria</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>Criar e publicar</div>
            </div>
          </Link>
          <Link href="/admin/autores" className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.875rem", textDecoration: "none", color: "inherit" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(79,142,247,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth="2" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>Autores</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>Gerenciar redatores</div>
            </div>
          </Link>
          <Link href="/admin/categorias" className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.875rem", textDecoration: "none", color: "inherit" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(245,166,35,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" aria-hidden="true">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>Categorias</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>Editorias do portal</div>
            </div>
          </Link>
          <a href="/" target="_blank" className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.875rem", textDecoration: "none", color: "inherit" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>Ver site</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>Abrir em nova aba</div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
