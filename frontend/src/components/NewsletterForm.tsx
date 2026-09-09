"use client";

import { useState, type FormEvent } from "react";
import { subscribeNewsletter } from "@/lib/public-api";

export default function NewsletterForm({ id }: { id: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;
    setPending(true);
    setError(null);
    try {
      const res = await subscribeNewsletter(email);
      setMessage(res.message);
      form.reset();
    } catch {
      setError("Não foi possível concluir a inscrição. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="seu@email.com" required aria-label="Seu e-mail" />
        <button type="submit" disabled={pending}>
          Assinar
        </button>
      </form>
      <div id={id} aria-live="polite">
        {message && <span className="newsletter-confirm">{message}</span>}
        {error && <span style={{ color: "#f87171" }}>{error}</span>}
      </div>
    </>
  );
}
