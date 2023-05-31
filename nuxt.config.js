import words from "./dataset/words.json";
import tags from "./dataset/tags.json";

export default defineNuxtConfig({
  ssr: true,
  components: true,

  nitro: {
    preset: "node-server",
  },

  css: [ "~/assets/styles/global.scss" ],

  runtimeConfig: {
    serverEnv: process.env.SERVER_ENV,
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "@funken-studio/sitemap-nuxt-3",
    "@pinia/nuxt",
  ],

  i18n: {
    locales: [
      {
        code: "en",
        iso: "en",
        name: "English",
      },
      {
        code: "ja",
        iso: "ja-JP",
        name: "日本語",
      },
      {
        code: "zh-CN",
        iso: "zh-CN",
        name: "简体中文",
      },
    ],
    strategy: "prefix",
    defaultLocale: "en",
    baseUrl: "https://genshin-dictionary.com",
    detectBrowserLanguage: {
      useCookie: true,
      cookieSecure: true,
      fallbackLocale: "en",
      redirectOn: "no prefix",
    },
  },

  robots: {
    rules: {
      UserAgent: "*",
      ...(process.env.SERVER_ENV === "production" ? {
        Allow: "/",
        Sitemap: "https://genshin-dictionary.com/sitemap.xml",
      } : {
        Disallow: "/",
      }),
    },
  },

  sitemap: async () => ({
    generateOnBuild: true,
    hostname: "https://genshin-dictionary.com",
    // disable automatic sitemap generation to exclude URLs without locale:
    // e.g. https://genshin-dictionary.com/about/
    exclude: [ "/**" ],
    gzip: false,
    // i18n: true, // TODO temporarily disable i18n option until nuxt/sitemap supports nuxt/i18n on Nuxt 3
    routes: [
      ...([ "en", "ja" , "zh-CN" ].map(lang => ([
        { url: `/${lang}/` },
        { url: `/${lang}/history/` },
        ...(words.map(word => ({ url: `/${lang}/${word.id}/`, lastmod: word.updatedAt }))),
        ...(Object.keys(tags).map(tagID => ({ url: `/${lang}/tags/${tagID}/` }))),
      ])).flat()),
      // Pages not translated yet
      { url: "/ja/about/" },
      { url: "/ja/opendata/" },
    ],
  }),
});
