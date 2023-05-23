import { translations as globalTranslations } from "@/libs/translations";
import nextConfig from "../../next.config";
import type { Locale, Translations } from "@/types";

export class I18n {
  constructor(private locale: Locale, private translations?: Translations) {}

  t(key: string, variables?: { [varName: string]: string|number }): string {
    let translation = this.translations?.[this.locale][key] ?? globalTranslations[this.locale][key];

    if (!translation) {
      throw new Error(`There is no such key: "${key}".`);
    }

    if (variables) {
      for (const [ varName, varValue ] of Object.entries(variables)) {
        translation = translation.replaceAll(`{${varName}}`, typeof varValue === "number" ? varValue.toString() : varValue);
      }
    }

    return translation;
  }
}

export const validateLocale = (locale: string|undefined): Locale => {
  if (locale && (
    locale === "en" ||
    locale === "ja" ||
    locale === "zh-CN"
  )) {
    return locale;
  } else if (locale?.startsWith("zh-")) {
    return "zh-CN";
  } else {
    // locale is not set or unexpected locale given. return "en" as the fallback locale.
    return "en";
  }
};

export const validateLocales = (locales: string[]|undefined): Locale[] => locales?.map(locale => validateLocale(locale)) ?? [];

export const getAvailableLocales = (): Locale[] => {
  const availableLocales = nextConfig.i18n?.locales.filter(loc => loc !== "default");
  return (availableLocales as Locale[]) ?? [];
};
