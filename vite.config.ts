import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { getRedirectedLocale } from "./src/lib/i18n.ts";
import inlangSettings from "./project.inlang/settings.json" with { type: "json" };
import { isLocale, type Locale } from "$lib/paraglide/runtime.js";

const locales: Locale[] = inlangSettings.locales.map((maybeLocale) => {
  if (!isLocale(maybeLocale)) {
    throw new Error("`locales` in project.inlang/settings.json is mismatched with `Locale` type in $lib/paraglide/runtime.js");
  }

  return maybeLocale;
});

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    devtoolsJson(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide",
      strategy: [
        "custom-locale-alias",
        "url",
        "cookie",
        "preferredLanguage",
        "baseLocale",
      ],
      urlPatterns: [
        {
          pattern: "/",
          localized: locales.map((locale) => ([
            locale,
            `/${ getRedirectedLocale(locale) }`,
          ])),
        },
        {
          pattern: "/:path(.*)?",
          localized: locales.map((locale) => ([
            locale,
            `/${ getRedirectedLocale(locale) }/:path(.*)?`,
          ])),
        },
      ],
    }),
  ],
  server: {
    port: 3000,
  },
});
