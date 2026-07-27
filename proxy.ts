import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  const isLoggedIn = !!sessionCookie;
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login");

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};