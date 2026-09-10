import Link from "next/link";

export const metadata = {
  title: "Sobre — Aurora PE",
  description: "Conheça o Aurora PE, portal de notícias focado no sindicalismo, movimentos sociais e ONGs.",
};

export default function SobrePage() {
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
          Quem Somos
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
          Sobre o Aurora PE
        </h1>
        <p
          style={{
            fontSize: "1.15rem",
            color: "var(--color-muted)",
            maxWidth: "60ch",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Jornalismo independente no centro das lutas sindicais e dos movimentos populares de Pernambuco.
        </p>
      </header>

      {/* Missão e Descrição */}
      <section
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: "1.8",
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          O <strong>Aurora PE</strong> nasceu para cobrir o que a grande mídia local costuma colocar de lado: as assembleias de base, as greves, a rotina dos sindicatos e os atos populares do litoral ao Sertão. Acreditamos em reportagem apurada no chão da fábrica, na sala de aula e nas ruas, ouvindo quem vive e constrói a realidade do estado.
        </p>
      </section>

      {/* Seção Expediente */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            marginBottom: "1.5rem",
            borderBottom: "2px solid var(--color-border)",
            paddingBottom: "0.5rem",
          }}
        >
          Expediente
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
            }}
          > 
            <img
              src="/images/Denilson_Miatto.jpeg"
              alt="Denilson Miatto"
              width={84}
              height={84}
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--color-border)",
                flexShrink: 0,
              }}
            />
            <div>
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
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  margin: "0.25rem 0 0.5rem",
                  color: "var(--color-primary)",
                }}
              >
                Denilson Miatto
              </h3>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-muted)" }}>
                E-mail:{" "}
                <a
                  href="mailto:redacaoaurorape@gmail.com"
                  style={{ color: "var(--color-secondary)", textDecoration: "underline" }}
                >
                  redacaoaurorape@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
            }}
          > 
            <img
              src="/images/Joao_Carlos_Mazella.jpeg"
              alt="João Mazella"
              width={84}
              height={84}
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--color-border)",
                flexShrink: 0,
              }}
            />
            <div>
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
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  margin: "0.25rem 0 0.5rem",
                  color: "var(--color-primary)",
                }}
              >
                João Mazella
              </h3>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-muted)" }}>
                E-mail:{" "}
                <a
                  href="mailto:redacaoaurorape@gmail.com"
                  style={{ color: "var(--color-secondary)", textDecoration: "underline" }}
                >
                  redacaoaurorape@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato & Apoio CTA */}
      <footer
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--color-primary)" }}>
            Tem uma denúncia ou sugestão de pauta?
          </h4>
          <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", margin: "0.25rem 0 0" }}>
            Fale direto com os repórteres. O sigilo da sua identidade é garantido.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a
            href="mailto:redacaoaurorape@gmail.com"
            className="btn-primary"
            style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
          >
            Fale conosco
          </a>
          <Link
            href="/apoie"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              border: "1px solid var(--color-border)",
              borderRadius: "6px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Apoie o projeto
          </Link>
        </div>
      </footer>
    </div>
  );
}
