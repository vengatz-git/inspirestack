import { NextResponse } from "next/server";

import { auth } from "@/auth";

const protectedRoutes = ["/dashboard", "/onboarding"];
const authRoutes = ["/login"];

export default auth((request) => {
  const { nextUrl } = request;

  const pathname = nextUrl.pathname;

  const isLoggedIn = !!request.auth;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};