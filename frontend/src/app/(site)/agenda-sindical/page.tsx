import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: "Agenda Sindical — Aurora PE",
  description: "Acompanhe as assembleias, paralisações, debates, manifestações e reuniões sindicais em Pernambuco.",
};

export default function AgendaSindicalPage() {
  return (
    <div className="container" style={{ padding: "4rem 1rem", maxWidth: "900px" }}>
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
          Mobilização e Luta
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
          Agenda Sindical e Popular
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--color-muted)",
            maxWidth: "65ch",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          O espaço centralizado para divulgação de assembleias, mobilizações de categorias, greves, atos públicos e eventos de formação política em Pernambuco.
        </p>
      </header>

      {/* Orientações para os Sindicatos */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            marginBottom: "0.75rem",
          }}
        >
          📢 Como divulgar a atividade da sua entidade
        </h2>
        <p style={{ color: "var(--color-text)", fontSize: "1rem", lineHeight: 1.7, margin: "0 0 1rem" }}>
          Sindicatos, associações de classe, coletivos populares e centrais sindicais podem enviar gratuitamente seus editais de convocação, calendários de assembleias e informes de paralisação para a nossa redação.
        </p>
        <div
          style={{
            background: "rgba(26, 26, 46, 0.04)",
            borderLeft: "4px solid var(--color-secondary)",
            padding: "1rem 1.25rem",
            borderRadius: "0 8px 8px 0",
            marginBottom: "1.25rem",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-text)" }}>
            Envie com antecedência mínima de <strong>48 horas</strong> para o e-mail oficial:{" "}
            <a
              href="mailto:redacaoaurorape@gmail.com?subject=[Agenda%20Sindical]"
              style={{ color: "var(--color-secondary)", fontWeight: 700, textDecoration: "underline" }}
            >
              redacaoaurorape@gmail.com
            </a>{" "}
            com o assunto <strong>[Agenda Sindical]</strong>.
          </p>
        </div>
      </div>

      {/* Setores e Categorias Acompanhadas */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            marginBottom: "1.25rem",
            borderBottom: "2px solid var(--color-border)",
            paddingBottom: "0.5rem",
          }}
        >
          Categorias em Foco na Cobertura
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {[
            { title: "Servidores Públicos", desc: "Municipais, estaduais e federais: negociações salariais e planos de carreira." },
            { title: "Educação & Docência", desc: "Professores e corpo técnico das redes pública e privada de Pernambuco." },
            { title: "Saúde & Enfermagem", desc: "Pisos salariais, condições de trabalho nos hospitais e unidades básicas." },
            { title: "Transportes & Trânsito", desc: "Rodoviários, metroviários e categorias essenciais de mobilidade urbana." },
            { title: "Trabalhadores Rurais", desc: "Luta pela terra, agricultura familiar, FETAPE e sindicatos do campo." },
            { title: "Indústria & Construção", desc: "Metalúrgicos, polos industriais de Suape e Goiana, operários da construção." },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                padding: "1.25rem",
              }}
            >
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: "0.5rem" }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter específica para boletins */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          padding: "2.5rem 2rem",
          textAlign: "center",
          marginBottom: "2.5rem",
        }}
      >
        <span
          style={{
            color: "var(--color-secondary)",
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Boletim Informativo
        </span>
        <h2
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            margin: "0.5rem 0 0.75rem",
          }}
        >
          Receba o resumo das lutas sindicais
        </h2>
        <p style={{ color: "var(--color-muted)", maxWidth: "48ch", margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
          Cadastre seu e-mail para receber as notícias e convocatórias mais importantes da semana diretamente na sua caixa de entrada.
        </p>
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <NewsletterForm id="agenda-sindical-newsletter" />
        </div>
      </div>

      <div style={{ textAlign: "center", borderTop: "1px solid var(--color-border)", paddingTop: "2rem" }}>
        <Link href="/contato" style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem" }}>
          Dúvidas sobre envio de pautas? Fale com a redação →
        </Link>
      </div>
    </div>
  );
}
