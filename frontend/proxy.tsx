import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login"];

export function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const token = request.cookies.get("session_token")?.value;

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/units", request.url));
  }

  if (isPublic) {
    return NextResponse.next();
  }

  const hasMonth = searchParams.has("month");
  const hasYear = searchParams.has("year");

  if (hasMonth && hasYear) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  if (!hasMonth) url.searchParams.set("month", String(new Date().getMonth() + 1));
  if (!hasYear) url.searchParams.set("year", String(new Date().getFullYear()));

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};