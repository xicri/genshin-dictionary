import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { getRedirectedLocale } from "./src/lib/i18n/setup.ts";
import inlangSettings from "./project.inlang/settings.json" with { type: "json" };

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
          localized: inlangSettings.locales.map((locale) => ([
            locale,
            `/${ getRedirectedLocale(locale, { fallback: false }) }`,
          ])),
        },
        {
          pattern: "/:path(.*)?",
          localized: inlangSettings.locales.map((locale) => ([
            locale,
            `/${ getRedirectedLocale(locale, { fallback: false }) }/:path(.*)?`,
          ])),
        },
      ],
    }),
  ],
  server: {
    port: 3000,
  },
});
