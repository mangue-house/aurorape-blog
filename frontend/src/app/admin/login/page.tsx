import { loginAction } from "./actions";

export const metadata = { title: "Login — Aurora PE Admin" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <img src="/images/logo.avif" alt="Aurora PE" style={{ height: 44, width: "auto" }} />
          <div>
            <div style={{ fontFamily: "var(--font-headline)", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-primary)" }}>
              Aurora PE
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Painel administrativo
            </div>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "1.25rem 0" }} />

        {error && (
          <div className="alert-error" role="alert">
            {error}
          </div>
        )}

        <form action={loginAction}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              E-mail
            </label>
            <input className="form-control" type="email" id="email" name="email" placeholder="redacao@aurorape.com.br" required autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Senha
            </label>
            <input className="form-control" type="password" id="password" name="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", marginTop: "0.5rem" }}>
            Entrar
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--color-muted)", marginTop: "1.5rem" }}>
          <a href="/" style={{ color: "var(--color-secondary)" }}>
            ← Voltar ao site
          </a>
        </p>
      </div>
    </div>
  );
}
