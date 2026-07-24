"use server";

import { revalidatePath } from "next/cache";
import { getAdminToken } from "@/lib/auth";
import { createAuthor } from "@/lib/admin-api";

export async function createAuthorAction(formData: FormData) {
  const token = (await getAdminToken())!;
  await createAuthor(token, {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "") || null,
    bio: String(formData.get("bio") ?? "") || null,
    photo_url: String(formData.get("photo_url") ?? "") || null,
  });
  revalidatePath("/admin/autores");
}
