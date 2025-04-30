import acceptLanguage from "accept-language";
import locales from "../../tmp/locales.json";
import type { Locale } from "~/types.ts";

export default defineEventHandler((event) => {
  const getUserLanguage = (requestedAcceptLanguage: string | null | undefined): Locale => {
    acceptLanguage.languages(locales);

    const lang = acceptLanguage.get(requestedAcceptLanguage);
    if (!lang) {
      return "en";
    } else if (lang === "ja" || lang === "zh-CN" || lang === "zh-TW") {
      return lang;
    } else if (lang === "zh-HK") {
      return "zh-TW";
    } else if (lang === "zh" || lang === "zh-SG" || lang.startsWith("zh-")) {
      return "zh-CN";
    } else {
      return "en";
    }
  };

  if (!event.node.req.url) {
    console.error("[ERROR] Missing event.node.req.url in locale-redirect.ts.");
    return Response.redirect("/en?why=node-req-url-not-given", 302);
  }

  const reqURL = getRequestURL(event);
  const baseURL = `${ reqURL.protocol }//${ reqURL.host }`;
  const rawPath = reqURL.searchParams.get("path");
  const path = rawPath ? decodeURIComponent(rawPath) : undefined;

  if (!path) {
    // This should not happen by normal usecase unless there is a bug
    const destURL = new URL("/en", baseURL);
    destURL.searchParams.append("why", "path-not-given");
    return Response.redirect(destURL.href, 302);
  }

  if (!path.startsWith("/")) {
    // This should not happen by normal usecase unless there is a bug
    const destURL = new URL("/en", baseURL);
    destURL.searchParams.append("why", "not-a-path");
    destURL.searchParams.append("givenpath", encodeURIComponent(path));
    return Response.redirect(destURL.href, 302);
  }

  if (
    locales.some((locale) => `/${locale}` === path)
    || locales.some((locale) => path.startsWith(`/${locale}/`))
  ) {
    // This should not happen by normal usecase unless there is a bug
    const destURL = new URL(path, baseURL);
    destURL.searchParams.append("why", "already-locale-given");
    return Response.redirect(destURL.href, 302);
  } else {
    const acceptLanguage = event.headers.get("Accept-Language");
    const userLanguage = getUserLanguage(acceptLanguage);

    const destURL = new URL(`/${ userLanguage + path }`, baseURL);
    return Response.redirect(destURL.href, 302);
  }
});
