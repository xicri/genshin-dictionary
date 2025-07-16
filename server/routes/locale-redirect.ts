import { parse } from "@escapace/accept-language-parser";
import type { Locale } from "~/utils/types.ts";
import locales from "../../tmp/locales.json";

export default defineEventHandler((event) => {
  const getUserLanguage = (acceptLanguage: string | null | undefined): Locale => {
    if (!acceptLanguage) {
      return "en";
    }

    const languages = parse(acceptLanguage);

    for (const language of languages) {
      if (language.code === "ja") {
        return "ja";
      } else if (language.code === "zh") {
        if (
          language.region === "TW"
          || language.region === "HK"
        ) {
          return "zh-TW";
        } else {
          return "zh-CN";
        }
      } else {
        return "en";
      }
    }

    // If acceptLanguage is not sent from client
    return "en";
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
    locales.some((locale) => `/${ locale }` === path)
    || locales.some((locale) => path.startsWith(`/${ locale }/`))
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
