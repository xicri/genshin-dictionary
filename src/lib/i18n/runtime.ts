// Don't use `$lib/` path here because this file is imported by vite.config.ts
import { localeRedirections, supportedLocales } from "../../app.config.ts";
import { getLocale, type Locale } from "$lib/paraglide/runtime.js";

export type SupportedLocale = typeof supportedLocales[number];

const isSupportedLocale = (maybeLocale: string): maybeLocale is SupportedLocale =>
  (supportedLocales as string[]).includes(maybeLocale);

export const getSupportedLocale = (): SupportedLocale => {
  const locale = getLocale();
  return isSupportedLocale(locale) ? locale : "en";
};

export type LocaleRedirection = {
  from: Locale;
  to: SupportedLocale;
};

type GetRedirectedLocaleOptions = {
  fallback?: boolean;
};

export const getRedirectedLocale = (
  rawLocale: string,
  { fallback = true }: GetRedirectedLocaleOptions = {},
): SupportedLocale => {
  const redirectedLocale = localeRedirections.find((a) => a.from === rawLocale)?.to ?? rawLocale;

  if (redirectedLocale && isSupportedLocale(redirectedLocale)) {
    return redirectedLocale;
  } else {
    if (fallback === true) {
      return "en";
    } else {
      throw new Error(
        `Unexpected locale "${ rawLocale }" is given. Sorry, this is probably a bug of Genshin Dictionary. Error code: GD-2HE7D`,
      );
    }
  }
};
