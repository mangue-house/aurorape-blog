"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminToken } from "@/lib/auth";
import { createArticle, deleteArticle, updateArticle } from "@/lib/admin-api";
import type { ArticleCreate } from "@/lib/types";

export async function deleteArticleAction(id: number | string) {
  const token = await requireAdminToken();
  await deleteArticle(token, id);
  revalidatePath("/admin");
}

function parseArticleForm(formData: FormData): ArticleCreate {
  const readingTime = formData.get("reading_time_min");
  const actionIntent = String(formData.get("action_intent") ?? "");
  const isPublishedChecked = formData.get("is_published") === "true";

  let isPublished = isPublishedChecked;
  if (actionIntent === "publish") {
    isPublished = true;
  } else if (actionIntent === "save_draft") {
    isPublished = false;
  } else {
    isPublished = isPublishedChecked;
  }

  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim() || null,
    subtitle: String(formData.get("subtitle") ?? "").trim() || null,
    chapeu: String(formData.get("chapeu") ?? "").trim() || null,
    body: String(formData.get("body") ?? ""),
    featured_image_url: String(formData.get("featured_image_url") ?? "").trim() || null,
    reading_time_min: readingTime ? Number(readingTime) : null,
    is_published: isPublished,
    author_id: Number(formData.get("author_id")),
    category_id: Number(formData.get("category_id")),
  };
}

export async function createArticleAction(formData: FormData) {
  const token = await requireAdminToken();
  const payload = parseArticleForm(formData);
  await createArticle(token, payload);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateArticleAction(id: number | string, formData: FormData) {
  const token = await requireAdminToken();
  const payload = parseArticleForm(formData);
  await updateArticle(token, id, payload);
  revalidatePath("/admin");
  redirect("/admin");
}
