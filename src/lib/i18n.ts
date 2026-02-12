// Don't use `$lib/` path here because this file is imported by vite.config.ts
import { localeRedirections, supportedLocales } from "../app.config.ts";
import type { Locale } from "./paraglide/runtime.js";

export type SupportedLocale = typeof supportedLocales[number];

export type LocaleRedirection = {
  from: Locale;
  to: SupportedLocale;
};

export const getRedirectedLocale = (rawLocale: Locale): SupportedLocale => {
  const redirectedLocale = localeRedirections.find((a) => a.from === rawLocale)?.to;

  if (redirectedLocale) {
    return redirectedLocale;
  } else {
    throw new Error(
      `Unexpected locale "${ rawLocale }" is given. Sorry, this is probably a bug of Genshin Dictionary. Error code: GD-2HE7D`,
    );
  }
};
