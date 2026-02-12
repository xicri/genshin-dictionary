// Don't use `$lib/` path here because this file is imported by non-SvelteKit files
import type { LocaleRedirection } from "./lib/i18n/runtime.ts";
import type { Locale } from "./lib/paraglide/runtime.js";

export const headers = {
  "Cross-Origin-Resource-Policy": "same-origin",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
};

export const supportedLocales = [
  "en",
  "ja",
  "zh-CN",
  "zh-TW",
] as const satisfies Locale[];

export const localeRedirections: LocaleRedirection[] = [
  { from: "zh", to: "zh-CN" },
  { from: "zh-Hans", to: "zh-CN" },
  { from: "zh-Hant", to: "zh-TW" },
  { from: "zh-HK", to: "zh-TW" },
  { from: "zh-MO", to: "zh-TW" },
  { from: "zh-SG", to: "zh-TW" },
];
