import { NextResponse } from "next/server";

import { auth } from "@/auth";

const protectedRoutes = [
  "/feed",
  "/create",
  "/search",
  "/onboarding",
];

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
    return NextResponse.redirect(
      new URL("/login", nextUrl),
    );
  }

  if (isAuthRoute && isLoggedIn) {
    const destination = request.auth?.user?.isOnboarded
      ? "/feed"
      : "/onboarding";

    return NextResponse.redirect(
      new URL(destination, nextUrl),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/feed/:path*",
    "/create/:path*",
    "/search/:path*",
    "/onboarding/:path*",
    "/login",
  ],
};