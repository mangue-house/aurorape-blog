"use client";

import { useRef, useState } from "react";
import { toSlug } from "@/lib/format";
import type { AuthorOut } from "@/lib/types";

export default function AuthorEditForm({
  author,
  action,
}: {
  author: AuthorOut;
  action: (formData: FormData) => Promise<void>;
}) {
  const [slug, setSlug] = useState(author.slug);
  const slugEdited = useRef(true);

  return (
    <form action={action} className="card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Nome <span style={{ color: "var(--color-secondary)" }}>*</span>
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            defaultValue={author.name}
            required
            autoComplete="off"
            onChange={(e) => {
              if (!slugEdited.current) setSlug(toSlug(e.target.value));
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="slug">
            Slug
          </label>
          <input
            className="form-control"
            type="text"
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              slugEdited.current = true;
              setSlug(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="role">
            Role <span style={{ color: "var(--color-secondary)" }}>*</span>
          </label>
          <input className="form-control" type="text" id="role" name="role" defaultValue={author.role ?? ""} placeholder="Ex: Editor-chefe" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email <span style={{ color: "var(--color-secondary)" }}>*</span>
          </label>
          <input className="form-control" type="email" id="email" name="email" defaultValue={author.email ?? ""} required autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Nova senha <span className="form-hint">opcional</span>
          </label>
          <input className="form-control" type="password" id="password" name="password" placeholder="Deixe em branco para manter" minLength={8} autoComplete="new-password" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="photo_url">
            URL da foto
          </label>
          <input className="form-control" type="url" id="photo_url" name="photo_url" defaultValue={author.photo_url ?? ""} placeholder="https://…" />
        </div>
        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <label className="form-label" htmlFor="bio">
            Bio
          </label>
          <input className="form-control" type="text" id="bio" name="bio" defaultValue={author.bio ?? ""} placeholder="Breve descrição do redator…" />
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="btn-primary">
          Salvar
        </button>
      </div>
    </form>
  );
}
