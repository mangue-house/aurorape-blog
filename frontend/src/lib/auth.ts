import { cookies } from "next/headers";

export const ADMIN_TOKEN_COOKIE = "admin_token";

export async function getAdminToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ADMIN_TOKEN_COOKIE)?.value;
}
