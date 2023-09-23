import words from "./dataset/words.json";
import tags from "./dataset/tags.json";

export default defineNuxtConfig({
  ssr: true,
  components: true,

  nitro: {
    preset: "node-server",
  },
  typescript: {
    strict: true,
  },

  css: [ "~/assets/styles/global.scss" ],

  runtimeConfig: {
    serverEnv: process.env.SERVER_ENV,
  },

  modules: [
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxt/devtools",
    "@nuxtjs/storybook",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
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

  sitemap: {
    autoLastmod: false,
    cacheTtl: 0, // disable cache
    urls: [
      ...([ "en", "ja" , "zh-CN" ].map(lang => [
        { loc: `/${lang}` },
        { loc: `/${lang}/history` },
        ...(words.map(word => ({ loc: `/${lang}/${word.id}`, lastmod: word.updatedAt }))),
        ...(Object.keys(tags).map(tagID => ({ loc: `/${lang}/tags/${tagID}` }))),
      ]).flat()),
      // Pages not translated yet
      { loc: "/ja/about" },
      { loc: "/ja/opendata" },
    ],
    exclude: [
      "/en/about",
      "/en/opendata",
      "/zh-CN/about",
      "/zh-CN/opendata",
    ],
  },

  devtools: {
    enabled: true,
  },

  storybook: {
    url: "http://localhost:6006",
    storybookRoute: "/__storybook__",
    port: 6006,
    devtools: true,
  },

  // For nuxt-simple-robots and nuxt-simple-sitemap
  site: {
    url: "https://genshin-dictionary.com",
    indexable: process.env.SERVER_ENV === "production",
  },
});
