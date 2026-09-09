"use client";

import { useRef, useState } from "react";
import { toSlug } from "@/lib/format";
import { createCategoryAction } from "@/app/admin/(dashboard)/categorias/actions";

export default function CategoryCreateForm() {
  const [slug, setSlug] = useState("");
  const slugEdited = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createCategoryAction(formData);
        formRef.current?.reset();
        setSlug("");
        slugEdited.current = false;
      }}
    >
      <div className="inline-create">
        <div className="form-group" style={{ flex: 1.5 }}>
          <label className="form-label" htmlFor="name">
            Nome
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            placeholder="Ex: Política, Cultura"
            required
            autoComplete="off"
            onChange={(e) => {
              if (!slugEdited.current) setSlug(toSlug(e.target.value));
            }}
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label" htmlFor="slug">
            Slug <span className="form-hint">auto</span>
          </label>
          <input
            className="form-control"
            type="text"
            id="slug"
            name="slug"
            placeholder="politica"
            value={slug}
            onChange={(e) => {
              slugEdited.current = true;
              setSlug(e.target.value);
            }}
          />
        </div>
        <div className="form-group" style={{ flex: 2 }}>
          <label className="form-label" htmlFor="description">
            Descrição
          </label>
          <input className="form-control" type="text" id="description" name="description" placeholder="Breve descrição…" />
        </div>
        <div style={{ paddingBottom: "0.05rem" }}>
          <label className="form-label" style={{ visibility: "hidden" }}>
            Criar
          </label>
          <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
            + Criar
          </button>
        </div>
      </div>
    </form>
  );
}
