import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_TOKEN_COOKIE = "admin_token";

export async function getAdminToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ADMIN_TOKEN_COOKIE)?.value;
}

export async function requireAdminToken(): Promise<string> {
  const token = await getAdminToken();
  if (!token) {
    redirect("/admin/login");
  }
  return token;
}
