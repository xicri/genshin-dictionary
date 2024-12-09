import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://genshin-dictionary.com",
  output: "static",

  i18n: {
    locales: [ "en", "ja", "zh-CN" ],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      fallbackType: "redirect",
    },
  },
});
