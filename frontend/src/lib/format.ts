export function formatDate(iso?: string | null, options?: Intl.DateTimeFormatOptions): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("pt-BR", options ?? { day: "2-digit", month: "2-digit", year: "numeric" }).format(
    new Date(iso)
  );
}

export function formatDateLong(iso?: string | null): string {
  return formatDate(iso, { day: "numeric", month: "long", year: "numeric" });
}

export function formatToday(): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export function toSlug(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
