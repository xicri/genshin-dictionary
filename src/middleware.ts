import { parse } from "@escapace/accept-language-parser";
import { NextResponse } from "next/server";
import { validateLocale } from "./libs/i18n";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest): NextResponse {
  const res = NextResponse.next();

  // Ignore files with extension (≒ files under public directory)
  if (/\.(.*)$/.test(req.nextUrl.pathname)) {
    return res;
  }

  if (req.nextUrl.locale === "default") { // root path without locale path
    const path = req.nextUrl.pathname + req.nextUrl.search + req.nextUrl.hash;

    const localeInCookie = req.cookies.get("NEXT_LOCALE")?.value;

    if (localeInCookie) {
      const locale = validateLocale(localeInCookie);
      return NextResponse.redirect(`${req.nextUrl.protocol}//${req.nextUrl.host}/${locale}${path}`);
    } else {
      const acceptLanguageString = req.headers.get("Accept-Language");

      if (acceptLanguageString) {
        const acceptLanguages = parse(acceptLanguageString);

        for (const acceptLanguage of acceptLanguages) {
          if (
            acceptLanguage.code === "en" ||
            acceptLanguage.code === "ja"
          ) {
            return NextResponse.redirect(`${req.nextUrl.protocol}//${req.nextUrl.host}/${acceptLanguage.code}${path}`);
          } else if (acceptLanguage.code === "zh") {
            return NextResponse.redirect(`${req.nextUrl.protocol}//${req.nextUrl.host}/zh-CN${path}`);
          }
        }

        // If supported languages are not in Accept-Language, redirect to /en/
        return NextResponse.redirect(`${req.nextUrl.protocol}//${req.nextUrl.host}/en${path}`);
      } else {
        return NextResponse.redirect(`${req.nextUrl.protocol}//${req.nextUrl.host}/en${path}`);
      }
    }
  } else { // with locale path (/en/*, /ja/*, /zh-CN/*)
    res.cookies.set("NEXT_LOCALE", req.nextUrl.locale);
    return res;
  }
}

export const config = {
  matcher: [
    // Exclude static files as many as possible
    "/((?!_next/|dataset/|images/|vendor/).*)",
    "/",
  ],
};
