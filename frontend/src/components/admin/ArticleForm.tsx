"use client";

import { useRef, useState, type FormEvent } from "react";
import { toSlug } from "@/lib/format";
import type { ArticleOut, AuthorMini, CategoryOut } from "@/lib/types";

const TOOLBAR_BUTTONS: { cmd: string; val?: string; title: string; label: string }[] = [
  { cmd: "bold", title: "Negrito (Ctrl+B)", label: "B" },
  { cmd: "italic", title: "Itálico (Ctrl+I)", label: "I" },
  { cmd: "underline", title: "Sublinhado", label: "U" },
  { cmd: "formatBlock", val: "h2", title: "Subtítulo H2", label: "H2" },
  { cmd: "formatBlock", val: "h3", title: "Intertítulo H3", label: "H3" },
  { cmd: "formatBlock", val: "blockquote", title: "Citação / Pull quote", label: "”" },
  { cmd: "insertUnorderedList", title: "Lista com marcadores", label: "•" },
  { cmd: "insertOrderedList", title: "Lista numerada", label: "1." },
  { cmd: "removeFormat", title: "Remover formatação", label: "✕" },
];

export default function ArticleForm({
  article,
  categories,
  authors,
  action,
}: {
  article?: ArticleOut;
  categories: CategoryOut[];
  authors: AuthorMini[];
  action: (formData: FormData) => Promise<void>;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const bodyHiddenRef = useRef<HTMLTextAreaElement>(null);
  const [slug, setSlug] = useState(article?.slug ?? "");
  const slugEdited = useRef(Boolean(article?.slug));
  const [imgUrl, setImgUrl] = useState(article?.featured_image_url ?? "");
  const [imgError, setImgError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (bodyHiddenRef.current && editorRef.current) {
      bodyHiddenRef.current.value = editorRef.current.innerHTML;
    }
  }

  function handleToolbarClick(cmd: string, val?: string) {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  }

  function handleLink() {
    const selection = window.getSelection();
    const anchor = selection?.anchorNode?.parentElement?.closest("a") as HTMLAnchorElement | null;
    const url = window.prompt("URL do link:", anchor?.href || "https://");
    if (url === null) return;
    if (url === "") {
      document.execCommand("unlink", false);
    } else {
      document.execCommand("createLink", false, url);
      const newAnchor = window.getSelection()?.anchorNode?.parentElement?.closest("a") as HTMLAnchorElement | null;
      if (newAnchor) newAnchor.target = "_blank";
    }
    editorRef.current?.focus();
  }

  return (
    <form id="article-form" action={action} onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card form-section">
            <div className="form-group">
              <label className="form-label" htmlFor="chapeu">
                Chapéu <span className="form-hint">Linha de editoria acima do título (ex: Política, Exclusivo)</span>
              </label>
              <input className="form-control" type="text" id="chapeu" name="chapeu" placeholder="Ex: Política" maxLength={80} defaultValue={article?.chapeu ?? ""} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Título <span style={{ color: "var(--color-secondary)" }}>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                placeholder="Título da matéria"
                required
                autoComplete="off"
                defaultValue={article?.title ?? ""}
                onChange={(e) => {
                  if (!slugEdited.current) setSlug(toSlug(e.target.value));
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="slug">
                Slug <span className="form-hint">URL amigável — gerado automaticamente pelo título</span>
              </label>
              <input
                className="form-control"
                type="text"
                id="slug"
                name="slug"
                placeholder="titulo-da-materia"
                value={slug}
                onChange={(e) => {
                  slugEdited.current = true;
                  setSlug(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subtitle">
                Subtítulo / Lead
              </label>
              <textarea className="form-control" id="subtitle" name="subtitle" rows={2} placeholder="Resumo ou linha fina da matéria" defaultValue={article?.subtitle ?? ""} />
            </div>
          </div>

          <div className="card form-section" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid var(--color-border)" }}>
              <label className="form-label" style={{ margin: 0 }}>
                Corpo da matéria <span style={{ color: "var(--color-secondary)" }}>*</span>
              </label>
            </div>

            <div className="editor-toolbar" role="toolbar" aria-label="Formatação de texto">
              {TOOLBAR_BUTTONS.map((btn) => (
                <button
                  key={btn.cmd + (btn.val ?? "")}
                  type="button"
                  className="editor-toolbar__btn"
                  title={btn.title}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleToolbarClick(btn.cmd, btn.val);
                  }}
                >
                  {btn.label}
                </button>
              ))}
              <button
                type="button"
                className="editor-toolbar__btn"
                title="Inserir link"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleLink();
                }}
              >
                🔗
              </button>
            </div>

            <div
              ref={editorRef}
              className="rich-editor"
              contentEditable
              role="textbox"
              aria-multiline="true"
              aria-label="Corpo da matéria"
              data-placeholder="Comece a escrever aqui…"
              suppressContentEditableWarning
              dangerouslySetInnerHTML={{ __html: article?.body ?? "" }}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  document.execCommand("insertHTML", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
                }
              }}
            />

            <textarea ref={bodyHiddenRef} name="body" required style={{ display: "none" }} defaultValue={article?.body ?? ""} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card form-section">
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Status
            </h3>
            <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: 0 }}>
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                value="true"
                defaultChecked={article?.is_published}
                style={{ width: 17, height: 17, cursor: "pointer", accentColor: "var(--color-secondary)" }}
              />
              <label htmlFor="is_published" style={{ fontWeight: 600, cursor: "pointer", userSelect: "none" }}>
                Publicado
              </label>
            </div>
          </div>

          <div className="card form-section">
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Metadados
            </h3>
            <div className="form-group">
              <label className="form-label" htmlFor="category_id">
                Categoria <span style={{ color: "var(--color-secondary)" }}>*</span>
              </label>
              <select className="form-control" id="category_id" name="category_id" required defaultValue={article?.category.id ?? ""}>
                <option value="">Selecione…</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="author_id">
                Autor <span style={{ color: "var(--color-secondary)" }}>*</span>
              </label>
              <select className="form-control" id="author_id" name="author_id" required defaultValue={article?.author.id ?? ""}>
                <option value="">Selecione…</option>
                {authors.map((aut) => (
                  <option key={aut.id} value={aut.id}>
                    {aut.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="reading_time_min">
                Tempo de leitura (min)
              </label>
              <input className="form-control" type="number" id="reading_time_min" name="reading_time_min" min={1} max={120} placeholder="5" defaultValue={article?.reading_time_min ?? ""} />
            </div>
          </div>

          <div className="card form-section">
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Imagem de destaque
            </h3>
            <div className="form-group" style={{ marginBottom: "0.75rem" }}>
              <label className="form-label" htmlFor="featured_image_url">
                URL da imagem
              </label>
              <input
                className="form-control"
                type="url"
                id="featured_image_url"
                name="featured_image_url"
                placeholder="https://…"
                value={imgUrl}
                onChange={(e) => {
                  setImgUrl(e.target.value);
                  setImgError(false);
                }}
              />
            </div>
            <div className={`img-preview${imgUrl && !imgError ? " has-img" : ""}`}>
              {imgUrl && <img src={imgUrl} alt="Pré-visualização" onError={() => setImgError(true)} />}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button type="submit" className="btn-primary" style={{ width: "100%" }}>
              {article ? "Salvar alterações" : "Publicar matéria"}
            </button>
            <a href="/admin" className="btn-secondary" style={{ width: "100%", textAlign: "center" }}>
              Cancelar
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
