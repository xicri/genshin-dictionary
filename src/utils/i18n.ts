import config from "../../astro.config.ts";

type SupportedLocale = Required<typeof config>["i18n"]["locales"][number];
type Translations = {
  [locale in SupportedLocale]: {
    [key: string]: string;
  };
};

/**
 *
 * @param url URL object of the current page. Just give `Astro.url`.
 * @returns
 */
export const defineTranslations = <T extends Translations>(translations: T, url: URL): {
  locale: SupportedLocale,
  t: (
    key: keyof T[typeof defaultLocale] extends string | number
      ? keyof T[typeof defaultLocale]
      : string | number
  ) => T[typeof defaultLocale][typeof key]
} => {
  const {
    locales: supportedLocales,
    defaultLocale: _defaultLocale,
  } = config.i18n ?? {};
  const defaultLocale = _defaultLocale ?? "en";
  const [ , localeInUrl ] = url.pathname.split("/");

  const locale = (localeInUrl in (supportedLocales ?? [])) ? localeInUrl as SupportedLocale
    : localeInUrl.toLowerCase().startsWith("zh-") || localeInUrl.toLowerCase() === "zh" ? "zh-CN"
    : defaultLocale;

  return {
    locale,
    t(key) {
      return translations[locale][key] ?? translations[defaultLocale][key];
    },
  };
}
