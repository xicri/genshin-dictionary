import { parse } from "@escapace/accept-language-parser";
import locales from "../../tmp/locales.json";
import type { Locale } from "~/types.ts";

const redirectByLanguage: PagesFunction = async ({ request }) => {
  const getUserLanguage = (acceptLanguage: string): Locale => {
    const languages = parse(acceptLanguage);

    for (const language of languages) {
      if (language.code === "ja") {
        return "ja";
      } else if (language.code === "zh") {
        if (language.region === "TW") {
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

  const reqURL = new URL(request.url);
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
    const acceptLanguage = request.headers.get("Accept-Language") as string;
    const userLanguage = getUserLanguage(acceptLanguage);

    const destURL = new URL(`/${ userLanguage + path }`, baseURL);
    return Response.redirect(destURL.href, 302);
  }
};

export const onRequestGet: PagesFunction = redirectByLanguage;
