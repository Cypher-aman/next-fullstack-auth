import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isUrlPublic =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/resetPassword";
  const token = req.cookies.get("token")?.value || "";

  if (isUrlPublic && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (!isUrlPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/resetPassword"],
};
