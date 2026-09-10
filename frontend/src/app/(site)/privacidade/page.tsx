import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade — Aurora PE",
  description: "Informações sobre privacidade, tratamento de dados e conformidade com a LGPD no portal Aurora PE.",
};

export default function PrivacidadePage() {
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
          Transparência e LGPD
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
          Política de Privacidade
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
            1. Compromisso com a Privacidade
          </h2>
          <p>
            O <strong>Aurora PE</strong> é um portal de jornalismo independente comprometido com a ética, a transparência e a salvaguarda dos dados pessoais de seus leitores, colaboradores e fontes, em estrita conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong> e demais normas brasileiras aplicáveis.
          </p>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            2. Dados Coletados e Finalidade
          </h2>
          <p>
            Nosso portal opera sob o princípio da minimização da coleta de dados. Coletamos unicamente as informações estritamente necessárias para a prestação dos serviços editoriais:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>
              <strong>Assinatura da Newsletter:</strong> Coletamos seu endereço de e-mail exclusivamente para envio periódico de boletins informativos, resumos de matérias e atualizações do Aurora PE, com base no seu consentimento expresso.
            </li>
            <li>
              <strong>Canais de Contato e Pautas:</strong> Dados enviados voluntariamente por e-mail para envio de sugestões, denúncias ou notas à imprensa são tratados com estrito sigilo e protegidos pelo direito constitucional ao sigilo da fonte jornalística (Art. 5º, XIV, da CF/88).
            </li>
            <li>
              <strong>Dados Técnicos de Navegação:</strong> Informações técnicas anônimas (como endereço IP anonimizado, tipo de navegador e páginas visitadas) podem ser registradas apenas para fins estatísticos de tráfego e integridade dos servidores, sem identificação individual dos usuários.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            3. Uso de Cookies
          </h2>
          <p>
            Utilizamos apenas cookies essenciais para o funcionamento seguro da plataforma:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>
              <strong>Cookies Técnicos e de Sessão:</strong> Utilizados exclusivamente para controle de autenticação do painel administrativo (com atributos de segurança <code>HttpOnly</code>, <code>SameSite</code> e <code>Secure</code>).
            </li>
            <li>
              <strong>Não comercializamos cookies:</strong> O Aurora PE <em>não</em> comercializa, não aluga e não compartilha perfis de navegação com redes de rastreamento de terceiros para publicidade comportamental.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            4. Seus Direitos como Titular de Dados
          </h2>
          <p>
            Em cumprimento ao Artigo 18 da LGPD, você possui o direito de, a qualquer momento e mediante solicitação gratuita:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
            <li>Confirmar a existência de tratamento dos seus dados;</li>
            <li>Acessar os dados fornecidos ao portal;</li>
            <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Revogar seu consentimento e solicitar a exclusão definitiva do seu e-mail de nossa base da newsletter.</li>
          </ul>
        </section>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--color-primary)" }}>
            5. Encarregado e Canal de Dúvidas
          </h2>
          <p>
            Para exercer seus direitos de privacidade ou esclarecer qualquer dúvida sobre o tratamento de dados neste portal, entre em contato direto com a equipe editorial:
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            <strong>E-mail de Contato:</strong>{" "}
            <a href="mailto:redacaoaurorape@gmail.com" style={{ color: "var(--color-secondary)", textDecoration: "underline" }}>
              redacaoaurorape@gmail.com
            </a>
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
