"use client";

import { useRef, useState } from "react";
import { toSlug } from "@/lib/format";
import { createAuthorAction } from "@/app/admin/(dashboard)/users/actions";

export default function AuthorCreateForm() {
  const [slug, setSlug] = useState("");
  const slugEdited = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createAuthorAction(formData);
        formRef.current?.reset();
        setSlug("");
        slugEdited.current = false;
      }}
    >
      <div className="inline-create" style={{ flexWrap: "wrap", gap: "0.75rem 1rem" }}>
        <div className="form-group" style={{ flex: 1, minWidth: 160 }}>
          <label className="form-label" htmlFor="name">
            Nome <span style={{ color: "var(--color-secondary)" }}>*</span>
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            placeholder="Nome completo"
            required
            autoComplete="off"
            onChange={(e) => {
              if (!slugEdited.current) setSlug(toSlug(e.target.value));
            }}
          />
        </div>
        <div className="form-group" style={{ flex: 1, minWidth: 140 }}>
          <label className="form-label" htmlFor="slug">
            Slug <span className="form-hint">auto</span>
          </label>
          <input
            className="form-control"
            type="text"
            id="slug"
            name="slug"
            placeholder="nome-do-autor"
            value={slug}
            onChange={(e) => {
              slugEdited.current = true;
              setSlug(e.target.value);
            }}
          />
        </div>
        <div className="form-group" style={{ flex: 1, minWidth: 140 }}>
          <label className="form-label" htmlFor="role">
            Role <span style={{ color: "var(--color-secondary)" }}>*</span>
          </label>
          <input className="form-control" type="text" id="role" name="role" placeholder="Ex: Editor-chefe" required />
        </div>
        <div className="form-group" style={{ flex: 1.5, minWidth: 180 }}>
          <label className="form-label" htmlFor="email">
            Email <span style={{ color: "var(--color-secondary)" }}>*</span>
          </label>
          <input className="form-control" type="email" id="email" name="email" placeholder="email@aurorape.com.br" required autoComplete="off" />
        </div>
        <div className="form-group" style={{ flex: 1.5, minWidth: 180 }}>
          <label className="form-label" htmlFor="password">
            Senha <span style={{ color: "var(--color-secondary)" }}>*</span>
          </label>
          <input className="form-control" type="password" id="password" name="password" placeholder="Mínimo 8 caracteres" required minLength={8} autoComplete="new-password" />
        </div>
        <div className="form-group" style={{ flex: 2, minWidth: 180 }}>
          <label className="form-label" htmlFor="bio">
            Bio
          </label>
          <input className="form-control" type="text" id="bio" name="bio" placeholder="Breve descrição do redator…" />
        </div>
        <div className="form-group" style={{ flex: 1.5, minWidth: 160 }}>
          <label className="form-label" htmlFor="photo_url">
            URL da foto
          </label>
          <input className="form-control" type="url" id="photo_url" name="photo_url" placeholder="https://…" />
        </div>
        <div style={{ paddingBottom: "0.05rem", alignSelf: "flex-end" }}>
          <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
            + Criar
          </button>
        </div>
      </div>
    </form>
  );
}
