import tags from "./dataset/tags.json";
import words from "./dataset/words.json";

const isLocal = !process.env.SERVER_ENV || process.env.SERVER_ENV === "local";

export default defineNuxtConfig({
  compatibilityDate: "2024-07-31",
  ssr: true, // Enable prerender
  components: true,

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        allowImportingTsExtensions: true,
        checkJs: true,

        newLine: "lf",
        removeComments: true,
        declaration: false,

        types: [
          "@cloudflare/workers-types/2023-07-01",
        ],
      },
      // Relative paths are based on .nuxt/tsconfig.json.
      // ../ means project root.
      exclude: [
        // Dataset from genshin-langdata
        "../dataset/**",
        "../public/dataset/**",
        // Cloudflare
        "../.wrangler/**",
        "../functions/**",
      ],
    },
  },

  css: [ "~/assets/styles/global.scss" ],

  runtimeConfig: {
    serverEnv: process.env.SERVER_ENV,
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@pinia/nuxt",
    ...(isLocal ? [ "@nuxt/devtools" ] : []),
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        iso: "en",
        name: "English",
      },
      {
        code: 'ja',
        iso: "ja-JP",
        name: "日本語",
      },
      {
        code: 'zh-CN',
        iso: "zh-CN",
        name: "简体中文",
      },
    ],
    strategy: "prefix",
    baseUrl: "https://genshin-dictionary.com",
    detectBrowserLanguage: false,
    vueI18n: "i18n.config.ts"
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
    enabled: isLocal,
  },

  // For nuxt-simple-robots and nuxt-simple-sitemap
  site: {
    url: "https://genshin-dictionary.com",
    indexable: process.env.SERVER_ENV === "production",
  },
});
