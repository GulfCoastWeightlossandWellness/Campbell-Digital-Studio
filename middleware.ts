import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Temporary Google Search Console verification mode.
 * Remove this file (and restore layout/page) after property is verified.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) return NextResponse.next();
  if (pathname === "/google6217edd756051041.html") return NextResponse.next();
  if (pathname === "/") return NextResponse.next();

  return NextResponse.rewrite(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
