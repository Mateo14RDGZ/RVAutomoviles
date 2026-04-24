import { NextResponse, type NextRequest } from "next/server";
import { getAdminCookieNameEdge, verifyAdminSessionTokenEdge } from "@/lib/auth-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/admin/login?err=config", request.url));
  }

  const token = request.cookies.get(getAdminCookieNameEdge())?.value;
  if (!(await verifyAdminSessionTokenEdge(token, secret))) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
