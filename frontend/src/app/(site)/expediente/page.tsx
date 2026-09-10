import Link from "next/link";

export const metadata = {
  title: "Expediente — Aurora PE",
  description: "Equipe editorial e expediente do portal Aurora PE.",
};

export default function ExpedientePage() {
  return (
    <div className="container" style={{ padding: "4rem 1rem", maxWidth: "860px" }}>
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span
          style={{
            color: "var(--color-secondary)",
            fontWeight: 700,
            fontSize: "0.875rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Redação & Equipe
        </span>
        <h1
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            margin: "0.5rem 0 1rem",
            lineHeight: 1.2,
          }}
        >
          Expediente
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--color-muted)",
            maxWidth: "60ch",
            margin: "0 auto",
          }}
        >
          Conheça a equipe responsável pela apuração, edição e coordenação editorial do Aurora PE.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            padding: "1.75rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--color-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Editor-chefe
          </span>
          <h2
            style={{
              fontSize: "1.35rem",
              fontWeight: 700,
              margin: "0.5rem 0",
              color: "var(--color-primary)",
            }}
          >
            Denilson Miatto
          </h2>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-muted)" }}>
            E-mail:{" "}
            <a
              href="mailto:redacaoaurorape@gmail.com"
              style={{ color: "var(--color-secondary)", textDecoration: "underline" }}
            >
              redacaoaurorape@gmail.com
            </a>
          </p>
        </div>

        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            padding: "1.75rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--color-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Fotojornalista Coordenador
          </span>
          <h2
            style={{
              fontSize: "1.35rem",
              fontWeight: 700,
              margin: "0.5rem 0",
              color: "var(--color-primary)",
            }}
          >
            João Mazella
          </h2>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-muted)" }}>
            E-mail:{" "}
            <a
              href="mailto:redacaoaurorape@gmail.com"
              style={{ color: "var(--color-secondary)", textDecoration: "underline" }}
            >
              redacaoaurorape@gmail.com
            </a>
          </p>
        </div>
      </section>

      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: "2rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--color-muted)", fontSize: "0.95rem" }}>
          Para envio de pautas, notas à imprensa ou sugestões:{" "}
          <a
            href="mailto:redacaoaurorape@gmail.com"
            style={{ color: "var(--color-secondary)", fontWeight: 600 }}
          >
            redacaoaurorape@gmail.com
          </a>
        </p>
        <p style={{ marginTop: "1rem" }}>
          <Link href="/sobre" style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem" }}>
            ← Saiba mais sobre o Aurora PE
          </Link>
        </p>
      </div>
    </div>
  );
}
