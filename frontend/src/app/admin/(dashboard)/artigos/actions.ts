"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminToken } from "@/lib/auth";
import { createArticle, deleteArticle, updateArticle } from "@/lib/admin-api";
import type { ArticleCreate } from "@/lib/types";

export async function deleteArticleAction(id: number) {
  const token = (await getAdminToken())!;
  await deleteArticle(token, id);
  revalidatePath("/admin");
}

function parseArticleForm(formData: FormData): ArticleCreate {
  const readingTime = formData.get("reading_time_min");
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? "") || null,
    subtitle: String(formData.get("subtitle") ?? "") || null,
    chapeu: String(formData.get("chapeu") ?? "") || null,
    body: String(formData.get("body") ?? ""),
    featured_image_url: String(formData.get("featured_image_url") ?? "") || null,
    reading_time_min: readingTime ? Number(readingTime) : null,
    is_published: formData.get("is_published") === "true",
    author_id: Number(formData.get("author_id")),
    category_id: Number(formData.get("category_id")),
  };
}

export async function createArticleAction(formData: FormData) {
  const token = (await getAdminToken())!;
  const payload = parseArticleForm(formData);
  await createArticle(token, payload);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateArticleAction(id: number, formData: FormData) {
  const token = (await getAdminToken())!;
  const payload = parseArticleForm(formData);
  await updateArticle(token, id, payload);
  revalidatePath("/admin");
  redirect("/admin");
}
