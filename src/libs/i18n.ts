import { translations as globalTranslations } from "@/libs/translations";
import type { Locale, Translations, tFunction } from "@/types";

export const setupI18n = (locale: Locale, translations: Translations): tFunction => {
  const t: tFunction = (key: string, variables?: { [varName: string]: string|number }): string => {
    let translation = translations[locale][key] ?? globalTranslations[locale][key];

    if (!translation) {
      throw new Error(`There is no such key: "${key}".`);
    }

    if (variables) {
      for (const [ varName, varValue ] of Object.entries(variables)) {
        translation = translation.replaceAll(`{${varName}}`, typeof varValue === "number" ? varValue.toString() : varValue);
      }
    }

    return translation;
  };

  return t;
};

export const validateLocale = (locale: string|undefined): Locale => {
  if (locale && (
    locale === "en" ||
    locale === "ja" ||
    locale === "zh-CN"
  )) {
    return locale;
  } else {
    // locale is not set or unexpected locale given. return "en" as the fallback locale.
    return "en";
  }
};
