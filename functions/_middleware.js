function getUserLanguage(acceptLanguage) {
  const languages = acceptLanguage
    .split(",")
    .map(language => language.split(";")[0].trim());

  for (const language of languages) {
    if (language === "en" || language === "ja") {
      return language;
    } else if (language.startsWith("en-")) {
      return "en";
    } else if (language.startsWith("ja-")) {
      return "ja";
    }
  }
}

export const onRequestGet = [
  async ({ request, next }) => {
    const url = new URL(request.url);
    const path = url.pathname;

    if (!path.startsWith("/en/") && !path.startsWith("/ja/")) {
      const acceptLanguage = request.headers.get("Accept-Language");
      const userLanguage = getUserLanguage(acceptLanguage);
      url.pathname = `/${userLanguage ?? "ja"}${path}`;
      return Response.redirect(url.href, 301);
    } else {
      return next();
    }
  },
];
