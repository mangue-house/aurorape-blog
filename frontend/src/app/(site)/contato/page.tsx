import Link from "next/link";

export const metadata = {
  title: "Contato — Aurora PE",
  description: "Entre em contato com a redação do Aurora PE. Envie pautas, notas de imprensa, denúncias e sugestões de cobertura.",
};

export default function ContatoPage() {
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
          Canais de Comunicação
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
          Fale com o Aurora PE
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--color-muted)",
            maxWidth: "60ch",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Nosso espaço está sempre aberto para trabalhadores, sindicatos, movimentos populares e coletivos sociais de Pernambuco.
        </p>
      </header>

      <div
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
            padding: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "rgba(233, 69, 96, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-secondary)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, color: "var(--color-primary)" }}>
                Redação & Pautas
              </h2>
              <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>Envio de releases e denúncias</span>
            </div>
          </div>
          <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 1rem" }}>
            Para sugerir matérias, enviar notas oficiais, divulgar atos ou enviar denúncias com sigilo jornalístico garantido.
          </p>
          <a
            href="mailto:redacaoaurorape@gmail.com"
            style={{
              color: "var(--color-secondary)",
              fontWeight: 700,
              fontSize: "1rem",
              wordBreak: "break-all",
              textDecoration: "underline",
            }}
          >
            redacaoaurorape@gmail.com
          </a>
        </div>

        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            padding: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "rgba(26, 26, 46, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-primary)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, color: "var(--color-primary)" }}>
                Base & Cobertura
              </h2>
              <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>Pernambuco</span>
            </div>
          </div>
          <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 1rem" }}>
            Atuamos em Recife, Região Metropolitana, Zona da Mata, Agreste e Sertão pernambucano cobrindo lutas populares e sindicais.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
            <Link
              href="/sobre"
              style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "underline" }}
            >
              Conheça a equipe →
            </Link>
          </div>
        </div>
      </div>

      {/* Orientações para envio de releases */}
      <section
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          padding: "2rem",
          marginBottom: "3rem",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "1rem", color: "var(--color-primary)" }}>
          Como enviar sua pauta ou evento sindical
        </h3>
        <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1rem" }}>
          Para que possamos realizar a cobertura com agilidade e qualidade, inclua no seu e-mail:
        </p>
        <ul style={{ paddingLeft: "1.5rem", color: "var(--color-text)", fontSize: "0.95rem", lineHeight: 1.8 }}>
          <li><strong>Assunto claro:</strong> Ex: <em>[Pauta] Paralisação dos Servidores Municipais no Recife</em>;</li>
          <li><strong>Informações essenciais:</strong> Data, horário exato, ponto de concentração ou local do evento;</li>
          <li><strong>Contatos da assessoria ou liderança:</strong> Telefone/WhatsApp para confirmação de informações pela equipe;</li>
          <li><strong>Material complementar:</strong> Documentos oficiais, fotos em boa qualidade (com crédito do autor) ou notas à imprensa.</li>
        </ul>
      </section>

      <div
        style={{
          textAlign: "center",
          borderTop: "1px solid var(--color-border)",
          paddingTop: "2.5rem",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: "0.5rem" }}>
          Quer fortalecer a nossa voz independente?
        </h3>
        <p style={{ color: "var(--color-muted)", maxWidth: "50ch", margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
          O Aurora PE se sustenta pelo apoio coletivo de quem acredita no jornalismo livre de interesses corporativos.
        </p>
        <Link href="/apoie" className="btn-primary" style={{ padding: "0.75rem 1.75rem", fontSize: "0.95rem" }}>
          Contribuir com o Aurora PE
        </Link>
      </div>
    </div>
  );
}
