import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="container" style={{ padding: "5rem 0", textAlign: "center" }}>
      <span style={{ color: "var(--color-secondary)", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Em breve
      </span>
      <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "2rem", margin: "0.75rem 0 1rem" }}>
        Esta página está a caminho
      </h1>
      <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        Estamos preparando este conteúdo. Volte em breve para conferir.
      </p>
      <Link href="/" className="btn-subscribe">
        Voltar à página inicial
      </Link>
    </div>
  );
}
