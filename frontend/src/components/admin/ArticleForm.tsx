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
  mode = "create",
  article,
  categories,
  authors,
  action,
}: {
  mode?: "create" | "edit";
  article?: ArticleOut;
  categories: CategoryOut[];
  authors: AuthorMini[];
  action: (formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const bodyHiddenRef = useRef<HTMLTextAreaElement>(null);
  const statusCheckboxRef = useRef<HTMLInputElement>(null);
  const actionIntentRef = useRef<HTMLInputElement>(null);

  const [slug, setSlug] = useState(article?.slug ?? "");
  const slugEdited = useRef(Boolean(article?.slug));
  const [imgUrl, setImgUrl] = useState(article?.featured_image_url ?? "");
  const [imgError, setImgError] = useState(false);

  const [isPublished, setIsPublished] = useState(article?.is_published ?? false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitIntent, setSubmitIntent] = useState<"publish" | "save_draft" | "save_edit" | null>(null);
  const [statusWarning, setStatusWarning] = useState<string | null>(null);

  function syncBody() {
    if (bodyHiddenRef.current && editorRef.current) {
      bodyHiddenRef.current.value = editorRef.current.innerHTML;
    }
  }

  function handleToolbarClick(cmd: string, val?: string) {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    syncBody();
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
    syncBody();
  }

  function validateCommon(): boolean {
    syncBody();
    const titleInput = formRef.current?.querySelector<HTMLInputElement>("#title");
    if (!titleInput?.value.trim()) {
      setStatusWarning("Por favor, preencha o título da matéria.");
      titleInput?.focus();
      return false;
    }

    const categorySelect = formRef.current?.querySelector<HTMLSelectElement>("#category_id");
    if (!categorySelect?.value) {
      setStatusWarning("Por favor, selecione uma categoria.");
      categorySelect?.focus();
      return false;
    }

    const authorSelect = formRef.current?.querySelector<HTMLSelectElement>("#author_id");
    if (!authorSelect?.value) {
      setStatusWarning("Por favor, selecione um autor.");
      authorSelect?.focus();
      return false;
    }

    const plainText = editorRef.current?.innerText?.trim() ?? "";
    const htmlText = editorRef.current?.innerHTML ?? "";
    if (!plainText && !htmlText.includes("<img")) {
      setStatusWarning("Por favor, escreva o corpo da matéria.");
      editorRef.current?.focus();
      return false;
    }

    return true;
  }

  function handleSaveEditClick() {
    if (isSubmitting) return;
    if (!validateCommon()) return;

    setStatusWarning(null);
    if (actionIntentRef.current) {
      actionIntentRef.current.value = "save_edit";
    }
    setSubmitIntent("save_edit");
    setIsSubmitting(true);
    formRef.current?.requestSubmit();
  }

  function handlePublishClick() {
    if (isSubmitting) return;
    if (!validateCommon()) return;

    if (!isPublished) {
      setStatusWarning(
        "Atenção: A matéria só será publicada no site se a caixa de Status 'Publicado' estiver marcada. Marque a opção 'Publicado' para publicar ou salve como rascunho."
      );
      statusCheckboxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      statusCheckboxRef.current?.focus();
      return;
    }

    setStatusWarning(null);
    if (actionIntentRef.current) {
      actionIntentRef.current.value = "publish";
    }
    setSubmitIntent("publish");
    setIsSubmitting(true);
    formRef.current?.requestSubmit();
  }

  function handleSaveDraftClick() {
    if (isSubmitting) return;
    if (!validateCommon()) return;

    setStatusWarning(null);
    setIsPublished(false);
    if (actionIntentRef.current) {
      actionIntentRef.current.value = "save_draft";
    }
    setSubmitIntent("save_draft");
    setIsSubmitting(true);
    formRef.current?.requestSubmit();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    syncBody();
  }

  return (
    <form ref={formRef} id="article-form" action={action} onSubmit={handleSubmit}>
      {/* Input oculto que informa a intenção da ação */}
      <input ref={actionIntentRef} type="hidden" name="action_intent" defaultValue="publish" />

      {/* Topbar integrada ao formulário */}
      <div className="admin-topbar">
        <div>
          <p className="admin-topbar__breadcrumb">
            <a href="/admin" style={{ color: "var(--color-muted)" }}>
              Matérias
            </a>{" "}
            / {mode === "create" ? "Nova" : "Editar"}
          </p>
          <h1>{mode === "create" ? "Nova matéria" : "Editar matéria"}</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {article?.slug && (
            <a href={`/artigo/${article.slug}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Ver no site ↗
            </a>
          )}
          {mode === "edit" ? (
            <button
              type="button"
              onClick={handleSaveEditClick}
              disabled={isSubmitting}
              className="btn-primary"
              style={{ minWidth: 140 }}
            >
              {isSubmitting && submitIntent === "save_edit" ? "Salvando…" : "Salvar alterações"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublishClick}
              disabled={isSubmitting}
              className="btn-primary"
              style={{ minWidth: 110 }}
            >
              {isSubmitting && submitIntent === "publish" ? "Publicando…" : "Publicar"}
            </button>
          )}
        </div>
      </div>

      <div className="admin-body">
        {statusWarning && (
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #f59e0b",
              borderRadius: 6,
              padding: "0.875rem 1rem",
              marginBottom: "1.25rem",
              color: "#92400e",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>⚠️</span>
            <span>{statusWarning}</span>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="card form-section">
              <div className="form-group">
                <label className="form-label" htmlFor="chapeu">
                  Chapéu <span className="form-hint">Linha de editoria acima do título (ex: Política, Exclusivo)</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="chapeu"
                  name="chapeu"
                  placeholder="Ex: Política"
                  maxLength={80}
                  defaultValue={article?.chapeu ?? ""}
                />
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
                <textarea
                  className="form-control"
                  id="subtitle"
                  name="subtitle"
                  rows={2}
                  placeholder="Resumo ou linha fina da matéria"
                  defaultValue={article?.subtitle ?? ""}
                />
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
                onInput={syncBody}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                    document.execCommand("insertHTML", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
                  }
                }}
              />

              {/* Textarea acessível e oculto sem atributo 'required' nativo para evitar bloqueios de validação do browser */}
              <textarea
                ref={bodyHiddenRef}
                name="body"
                tabIndex={-1}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
                defaultValue={article?.body ?? ""}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              className="card form-section"
              style={{
                border: statusWarning && !isPublished ? "2px solid #f59e0b" : undefined,
                transition: "border 0.2s ease",
              }}
            >
              <h3
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                Status
              </h3>
              <div
                className="form-group"
                style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem" }}
              >
                <input
                  ref={statusCheckboxRef}
                  type="checkbox"
                  id="is_published"
                  name="is_published"
                  value="true"
                  checked={isPublished}
                  onChange={(e) => {
                    setIsPublished(e.target.checked);
                    if (e.target.checked) setStatusWarning(null);
                  }}
                  style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--color-secondary)" }}
                />
                <label htmlFor="is_published" style={{ fontWeight: 600, cursor: "pointer", userSelect: "none" }}>
                  Publicado
                </label>
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: isPublished ? "var(--color-primary)" : "var(--color-muted)",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {isPublished
                  ? "✓ Marcado como publicado. Clique no botão 'Publicar' no topo para colocar no ar."
                  : "Modo rascunho. Não será exibido no site público."}
              </p>
            </div>

            <div className="card form-section">
              <h3
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
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
                <input
                  className="form-control"
                  type="number"
                  id="reading_time_min"
                  name="reading_time_min"
                  min={1}
                  max={120}
                  placeholder="5"
                  defaultValue={article?.reading_time_min ?? ""}
                />
              </div>
            </div>

            <div className="card form-section">
              <h3
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
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
                {imgUrl && !imgError && (
                  <img src={imgUrl} alt="Pré-visualização da capa" onError={() => setImgError(true)} />
                )}
                {imgUrl && imgError && (
                  <div style={{ padding: "1rem", textAlign: "center", color: "var(--color-secondary)", fontSize: "0.8rem" }}>
                    ⚠️ Imagem inacessível ou link inválido. Verifique se o endereço é público e direto.
                  </div>
                )}
                {!imgUrl && (
                  <div style={{ padding: "1rem", textAlign: "center", color: "var(--color-muted)", fontSize: "0.75rem" }}>
                    Cole o link direto da foto (formato recomendado: 1200 × 630px).
                  </div>
                )}
              </div>
            </div>

            {/* Ações abaixo da URL da Imagem */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {mode === "edit" ? (
                <button
                  type="button"
                  onClick={handleSaveEditClick}
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: "100%", fontWeight: 600, padding: "0.625rem 1rem", textAlign: "center" }}
                >
                  {isSubmitting && submitIntent === "save_edit" ? "Salvando…" : "Salvar alterações"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveDraftClick}
                  disabled={isSubmitting}
                  className="btn-secondary"
                  style={{ width: "100%", fontWeight: 600, padding: "0.625rem 1rem", textAlign: "center" }}
                >
                  {isSubmitting && submitIntent === "save_draft" ? "Salvando…" : "Salvar como rascunho"}
                </button>
              )}
              <a href="/admin" className="btn-secondary" style={{ width: "100%", textAlign: "center", opacity: 0.8 }}>
                Cancelar
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
