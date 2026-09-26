import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  const hasMonth = searchParams.has("month");
  const hasYear = searchParams.has("year");

  if (hasMonth && hasYear) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  if (!hasMonth) {
    const currentMonth = String(new Date().getMonth() + 1);
    url.searchParams.set("month", currentMonth);
  }

  if (!hasYear) {
    const currentYear = String(new Date().getFullYear());
    url.searchParams.set("year", currentYear);
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};