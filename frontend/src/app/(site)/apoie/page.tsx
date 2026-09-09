import PixCopyField from "@/components/PixCopyField";

export const metadata = { title: "Apoie — Aurora PE" };

const PIX_CODE =
  "00020126360014br.gov.bcb.pix0114+55819970404915204000053039865802BR5925Joao Carlos Rodrigues de 6006Recife62150511PAGAMENTO0163044E53";

export default function ApoiePage() {
  return (
    <div className="container" style={{ padding: "5rem 0", textAlign: "center" }}>
      <span style={{ color: "var(--color-secondary)", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Apoie o Aurora PE
      </span>
      <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "2rem", margin: "0.75rem 0 1rem" }}>
        Jornalismo independente precisa de leitores como você!
      </h1>

      <div
        style={{
          maxWidth: 360,
          margin: "2rem auto 0",
          padding: "1.5rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
        }}
      >
        <img
          src="/images/meu_pix.png"
          alt="QR Code para doação via Pix"
          width={240}
          height={240}
          style={{ display: "block", margin: "0 auto", borderRadius: 8, objectFit: "contain" }}
        />

        <div style={{ marginTop: "1.5rem" }}>
          <PixCopyField code={PIX_CODE} />
        </div>
      </div>

      <p style={{ color: "var(--color-muted)", maxWidth: "40ch", margin: "1.5rem auto 0" }}>
        Aponte a câmera do seu celular para o código acima ou use o Pix copia e cola, e contribua com qualquer valor. Cada doação ajuda a manter o Aurora PE independente e gratuito lutando nas trincheiras da informação.
      </p>
    </div>
  );
}








