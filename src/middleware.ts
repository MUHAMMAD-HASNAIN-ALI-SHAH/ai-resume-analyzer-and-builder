import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isSigninPage = nextUrl.pathname.startsWith("/signin");

  // 🔹 Redirects
  if (!isAuthenticated && !isSigninPage && nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/signin", nextUrl.origin));
  }

  if (isAuthenticated && isSigninPage) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
