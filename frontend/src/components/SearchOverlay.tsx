"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { search } from "@/lib/public-api";
import type { ArticleListItem } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ArticleListItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      search(query).then(setResults).catch(() => setResults([]));
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className={`search-overlay${open ? " is-open" : ""}`}
      id="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Busca"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ fontWeight: 600 }}>Buscar no Aurora PE</span>
          <button
            id="search-close"
            aria-label="Fechar busca"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "var(--color-muted)" }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <input
          ref={inputRef}
          type="search"
          name="q"
          placeholder="Digite para buscar..."
          autoComplete="off"
          aria-label="Campo de busca"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div id="search-results" className="search-results" aria-live="polite">
          {query.trim().length >= 2 && results.length === 0 && (
            <p style={{ color: "var(--color-muted)", padding: "0.75rem 0" }}>Nenhum resultado encontrado.</p>
          )}
          {results.map((article) => (
            <Link
              key={article.id}
              href={`/artigo/${article.slug}`}
              onClick={onClose}
              style={{ display: "block", padding: "0.6rem 0", borderBottom: "1px solid var(--color-border)" }}
            >
              <div style={{ fontWeight: 600 }}>{article.title}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
                {article.author.name} &middot; {formatDate(article.published_at)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
