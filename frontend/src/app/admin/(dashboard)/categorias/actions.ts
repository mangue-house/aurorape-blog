"use server";

import { revalidatePath } from "next/cache";
import { requireAdminToken } from "@/lib/auth";
import { createCategory } from "@/lib/admin-api";

export async function createCategoryAction(formData: FormData) {
  const token = await requireAdminToken();
  await createCategory(token, {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "") || null,
    description: String(formData.get("description") ?? "") || null,
  });
  revalidatePath("/admin/categorias");
}
