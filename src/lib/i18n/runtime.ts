import { supportedLocales } from "../../app.config.ts";
import { getLocale, type Locale } from "$lib/paraglide/runtime.js";
import { isSupportedLocale } from "$lib/i18n/setup.ts";

export type SupportedLocale = typeof supportedLocales[number];

export const getSupportedLocale = (): SupportedLocale => {
  const locale = getLocale();
  return isSupportedLocale(locale) ? locale : "en";
};

export type LocaleRedirection = {
  from: Locale;
  to: SupportedLocale;
};
