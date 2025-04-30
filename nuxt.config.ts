import { defineNuxtConfig } from "nuxt/config";
import tags from "./dataset/tags.json";
import words from "./dataset/words.json";
import type { LocaleObject } from "@nuxtjs/i18n";

const isLocal = !process.env.SERVER_ENV || process.env.SERVER_ENV === "local";
const tagIDs = Object.keys(tags);

export const locales = [
  {
    code: "en",
    language: "en",
    name: "English",
  },
  {
    code: "ja",
    language: "ja-JP",
    name: "日本語",
  },
  {
    code: "zh-CN",
    language: "zh-CN",
    name: "简体中文",
  },
  {
    code: "zh-TW",
    language: "zh-TW",
    name: "繁體中文",
  },
] as const satisfies LocaleObject<string>[];

export default defineNuxtConfig({
  compatibilityDate: "2025-02-07",
  ssr: true,
  components: true,

  nitro: {
    preset: "cloudflare-pages",
    prerender: {
      autoSubfolderIndex: false,
      routes: [ "en", "ja", "zh-CN", "zh-TW" ].map((locale) => [
        `/${ locale }`,
        ...(tagIDs.map((tagID) => `/${ locale }/tags/${ tagID }`)),
        `/${ locale }/about`,
        `/${ locale }/history`,
        `/${ locale }/opendata`,
      ]).flat(),
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
          "@cloudflare/workers-types",
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
    public: {
      serverEnv: process.env.SERVER_ENV,
    },
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@pinia/nuxt",
    ...(isLocal ? [ "@nuxt/devtools" ] : []),
  ],

  i18n: {
    locales,
    strategy: "prefix",
    baseUrl: "https://genshin-dictionary.com",
    detectBrowserLanguage: false,
    vueI18n: "i18n.config.ts"
  },

  sitemap: {
    autoLastmod: false,
    cacheMaxAgeSeconds: 0, // disable cache
    urls: [
      ...(locales.map(({ code: locale }) => [
        { loc: `/${locale}` },
        { loc: `/${locale}/history` },
        { loc: `/${locale}/about` },
        { loc: `/${locale}/opendata` },
        ...(words.map(word => ({ loc: `/${locale}/${word.id}`, lastmod: word.updatedAt }))),
        ...(tagIDs.map(tagID => ({ loc: `/${locale}/tags/${tagID}` }))),
      ]).flat()),
    ],
    exclude: [
      "/",
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
