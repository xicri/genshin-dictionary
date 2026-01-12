import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { locales } from "./project.inlang/settings.json";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide",
      strategy: [
        "url",
        "cookie",
        "baseLocale",
      ],
      urlPatterns: [
        {
          pattern: "/",
          localized: locales.map((locale) => ([
            locale,
            `/${ locale }`,
          ])),
        },
        {
          pattern: "/:path(.*)?",
          localized: locales.map((locale) => ([
            locale,
            `/${ locale }/:path(.*)?`,
          ])),
        },
      ],
    }),
  ],
  server: {
    port: 3000,
  },
});
