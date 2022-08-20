import words from "./dataset/words.json";
import tags from "./dataset/tags.json";

export default defineNuxtConfig({
  ssr: true,
  components: true,

  nitro: {
    preset: "node-server",
  },

  css: [ "~/assets/styles/global.scss" ],

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
    vueI18n: {
      legacy: false,
      fallbackLocale: "en",
      messages: {
        en: {
          siteTitle: "Genshin Dictionary",
          indexTitleDesc: "An online English-Chinese-Japanese dictionary of the terms in Genshin Impact",
          aboutTitle: "About this website",
          aboutDescription: "About Genshin Dictionary. This website is an online English-Chinese-Japanese dictionary of the terms in Genshin Impact.",
          historyTitle: "Update History",
          opendataTitle: "Open Data / API (β)",
          langNameEn: "English",
          langNameJa: "Japanese",
          langNameZhCN: "Chinese",
        },
        ja: {
          siteTitle: "原神 英語・中国語辞典",
          indexTitleDesc: "原神の固有名詞等の英語表記、及び中国語表記の一覧を掲載しています。",
          aboutTitle: "このサイトについて",
          aboutDescription: "原神英語・中国語辞典についての説明です。このサイトは PC・スマートフォン・プレイステーション4/5用ゲーム「原神」で用いられる固有名詞等の日本語・英語・中国語対訳表です。",
          historyTitle: "更新履歴",
          opendataTitle: "オープンデータ・API (β)",
          langNameEn: "英語",
          langNameJa: "日本語",
          langNameZhCN: "中国語",
        },
        "zh-CN": {
          siteTitle: "原神中英日辞典",
          indexTitleDesc: "一个在线的中英日三语原神游戏用语辞典",
          aboutTitle: "关于本网站",
          aboutDescription: "关于原神中英日辞典。本网站是一个在线的中英日三语原神游戏用语辞典。",
          historyTitle: "更新记录",
          opendataTitle: "开放数据 · API (β)",
          langNameEn: "英语",
          langNameJa: "日语",
          langNameZhCN: "简体中文",
        },
      },
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
