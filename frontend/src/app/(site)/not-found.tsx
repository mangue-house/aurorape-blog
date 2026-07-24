import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "5rem 0", textAlign: "center" }}>
      <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "2rem", marginBottom: "1rem" }}>
        Página não encontrada
      </h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        O conteúdo que você procura não existe ou foi removido.
      </p>
      <Link href="/" className="btn-subscribe">
        Voltar à página inicial
      </Link>
    </div>
  );
}
