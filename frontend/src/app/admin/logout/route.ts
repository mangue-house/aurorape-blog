import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const store = await cookies();
  store.delete(ADMIN_TOKEN_COOKIE);
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
