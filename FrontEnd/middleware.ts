import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// import { decrypt } from "./app/lib/session";
import { decrypt } from "./lib/sessions";
const protectedRoutes = ["/dashboard","/admin"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.access) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isPublicRoute && session?.access) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
