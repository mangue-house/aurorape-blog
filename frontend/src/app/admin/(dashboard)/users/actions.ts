"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminToken } from "@/lib/auth";
import { createAuthor, deleteAuthor, updateAuthor } from "@/lib/admin-api";

export async function createAuthorAction(formData: FormData) {
  const token = await requireAdminToken();
  await createAuthor(token, {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "") || null,
    bio: String(formData.get("bio") ?? "") || null,
    photo_url: String(formData.get("photo_url") ?? "") || null,
    role: String(formData.get("role") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  revalidatePath("/admin/users");
}

export async function updateAuthorAction(id: number, formData: FormData) {
  const token = await requireAdminToken();
  const password = String(formData.get("password") ?? "");
  await updateAuthor(token, id, {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "") || null,
    bio: String(formData.get("bio") ?? "") || null,
    photo_url: String(formData.get("photo_url") ?? "") || null,
    role: String(formData.get("role") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: password || null,
  });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteAuthorAction(id: number) {
  const token = await requireAdminToken();
  await deleteAuthor(token, id);
  revalidatePath("/admin/users");
}
