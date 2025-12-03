import { parse } from "@escapace/accept-language-parser";
import { NextResponse } from "next/server";
import { validateLocale } from "./libs/i18n";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest): NextResponse {
  const pathname = req.nextUrl.pathname;

  // Ignore files with extension (≒ files under public directory)
  if (/\.(.*)$/.test(pathname)) {
    return NextResponse.next();
  }

  // Check if pathname starts with a locale
  const pathnameHasLocale = /^\/(\w{2}|zh-CN)($|\/)/.test(pathname);

  if (!pathnameHasLocale) {
    // root path without locale path
    const localeInCookie = req.cookies.get("NEXT_LOCALE")?.value;

    if (localeInCookie) {
      const locale = validateLocale(localeInCookie);
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}${req.nextUrl.search}`, req.url)
      );
    } else {
      const acceptLanguageString = req.headers.get("Accept-Language");

      if (acceptLanguageString) {
        const acceptLanguages = parse(acceptLanguageString);

        for (const acceptLanguage of acceptLanguages) {
          if (
            acceptLanguage.code === "en" ||
            acceptLanguage.code === "ja"
          ) {
            return NextResponse.redirect(
              new URL(`/${acceptLanguage.code}${pathname}${req.nextUrl.search}`, req.url)
            );
          } else if (acceptLanguage.code === "zh") {
            return NextResponse.redirect(
              new URL(`/zh-CN${pathname}${req.nextUrl.search}`, req.url)
            );
          }
        }

        // If supported languages are not in Accept-Language, redirect to /en/
        return NextResponse.redirect(
          new URL(`/en${pathname}${req.nextUrl.search}`, req.url)
        );
      } else {
        return NextResponse.redirect(
          new URL(`/en${pathname}${req.nextUrl.search}`, req.url)
        );
      }
    }
  } else {
    // with locale path (/en/*, /ja/*, /zh-CN/*)
    const localeMatch = pathname.match(/^\/(\w{2}|zh-CN)/);
    if (localeMatch) {
      const locale = localeMatch[1];
      const res = NextResponse.next();
      res.cookies.set("NEXT_LOCALE", locale);
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude static files as many as possible
    "/((?!_next/|dataset/|images/|vendor/).*)",
    "/",
  ],
};
