import { NextRequest, NextResponse } from "next/server";

let locales = ["en", "es"];

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  const isInApi = pathname.startsWith("/api");
  

  if (pathnameHasLocale) return;
  if (isInApi) return;

  // Redirect if there is no locale
  const locale = request.headers.get("Accept-Language")?.split(",")[0].split("-")[0];
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
