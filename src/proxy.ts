import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "@/i18n/config";

// Keep all page routes under a locale so root layouts can set real lang/dir.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.redirect(url);
}
export const config = { matcher: ["/", "/blog/:path*"] };
