"use client";

import { useState } from "react";

export default function PixCopyField({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível (ex: contexto não seguro) — falha silenciosamente
    }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <label className="form-label" htmlFor="pix-copy-code">
        Código copie e cole:
      </label>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          id="pix-copy-code"
          className="form-control"
          type="text"
          readOnly
          value={code}
          onFocus={(e) => e.target.select()}
          style={{ fontSize: "0.75rem" }}
        />
        <button type="button" className="btn-secondary" style={{ whiteSpace: "nowrap" }} onClick={handleCopy}>
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
    </div>
  );
}
