import Link from "next/link";

export const metadata = {
  title: "Termos de Uso — Aurora PE",
  description: "Termos e condições de uso do portal Aurora PE, jornalismo independente de Pernambuco.",
};

export default function TermosPage() {
  return (
    <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <span
          style={{
            color: "var(--color-secondary)",
            fontWeight: 700,
            fontSize: "0.875rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Regras e Condições
        </span>
        <h1
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "2.25rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            margin: "0.5rem 0 0.5rem",
            lineHeight: 1.2,
          }}
        >
          Termos de Uso
        </h1>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
          Última atualização: Setembro de 2026
        </p>
      </header>

      <div
        className="card"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          padding: "2.5rem",
          color: "var(--color-text)",
          lineHeight: 1.8,
          fontSize: "1rem",
        }}
      >
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            1. Aceitação dos Termos
          </h2>
          <p>
            Ao acessar e utilizar o portal <strong>Aurora PE</strong> (disponível em <code>aurorape.com.br</code>), você expressa sua concordância integral com estes Termos de Uso. Caso não concorde com alguma das disposições aqui estabelecidas, recomendamos que interrompa a utilização do site.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            2. Direitos Autorais e Propriedade Intelectual
          </h2>
          <p>
            Todo o conteúdo publicado no portal — incluindo reportagens, artigos de opinião, crônicas, fotografias, ilustrações, logotipos e design — é de titularidade do <strong>Aurora PE</strong> ou de seus respectivos autores e colaboradores, estando protegido pela <strong>Lei de Direitos Autorais (Lei nº 9.610/1998)</strong>.
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>
              <strong>Reprodução Parcial e Citações:</strong> A reprodução de trechos de matérias é permitida para fins jornalísticos, acadêmicos ou de divulgação sindical, desde que acompanhada do devido crédito ao autor e de hiperlink direto e visível para a matéria original no Aurora PE.
            </li>
            <li>
              <strong>Reprodução Integral:</strong> A republicação na íntegra de matérias ou reportagens exclusivas é condicionada à autorização prévia por escrito da redação.
            </li>
            <li>
              <strong>Fotografias e Vídeos:</strong> As imagens capturadas por nossos fotojornalistas e colaboradores possuem direitos patrimoniais e morais inalienáveis, não sendo permitida sua apropriação sem crédito ou com fins comerciais.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            3. Conduta do Usuário
          </h2>
          <p>Ao navegar pelo portal e interagir com nossos formulários e canais de contato, o leitor se compromete a:</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>Não enviar informações falsas, difamatórias, fraudulentas ou que incitem ódio, preconceito e violência;</li>
            <li>Não utilizar os formulários para envio de publicidade não solicitada (spam);</li>
            <li>Não executar ataques cibernéticos, requisições de sobrecarga (DoS) ou tentativas de violação de segurança do portal.</li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            4. Links Externos
          </h2>
          <p>
            O portal pode conter links para sites de sindicatos, organizações internacionais, órgãos governamentais ou fontes externas. O Aurora PE não exerce controle sobre esses domínios e não se responsabiliza pelas políticas, conteúdos ou serviços de plataformas de terceiros.
          </p>
        </section>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            5. Legislação e Foro
          </h2>
          <p>
            Estes termos são regidos pelas leis da República Federativa do Brasil. Para a resolução de eventuais litígios oriundos do uso deste portal, fica eleito o Foro da Comarca do <strong>Recife, Estado de Pernambuco</strong>.
          </p>
        </section>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link href="/" style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem" }}>
          ← Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
