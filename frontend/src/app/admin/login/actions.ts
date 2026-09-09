"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api";
import { login } from "@/lib/admin-api";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  let token: string;
  try {
    const res = await login({ email, password });
    token = res.access_token;
  } catch (err) {
    const message = err instanceof ApiError ? err.message : "Erro ao entrar.";
    redirect(`/admin/login?error=${encodeURIComponent(message)}`);
  }

  const store = await cookies();
  store.set(ADMIN_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}
