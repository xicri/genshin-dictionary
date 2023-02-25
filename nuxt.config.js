import words from "./static/dataset/words.json";
import tags from "./static/dataset/tags.json";

export default async () => {
  const config = {
    target: "server",
    components: true,
    modern: "client",

    router: {
      trailingSlash: true,
      middleware: [
        "headers",
        "trailing-slash",
      ],
    },

    modules: [
      "@nuxtjs/i18n",
      "@nuxtjs/robots",
      "@nuxtjs/sitemap",
    ],
    buildModules: [
      "@nuxtjs/composition-api/module",
      "@pinia/nuxt",
    ],

    i18n: {
      vueI18n: {
        messages: {
          en: {
            aboutTitle: "About this website",
            aboutDescription: "About Genshin Dictionary. This website is an online English-Chinese-Japanese dictionary of the terms in Genshin Impact.",
            historyTitle: "Update History",
            opendataTitle: "Open Data / API (β)",
            langNameEn: "English",
            langNameJa: "Japanese",
            langNameZhCN: "Chinese",
          },
          ja: {
            aboutTitle: "このサイトについて",
            aboutDescription: "原神英語・中国語辞典についての説明です。このサイトは PC・スマートフォン・プレイステーション4/5用ゲーム「原神」で用いられる固有名詞等の日本語・英語・中国語対訳表です。",
            historyTitle: "更新履歴",
            opendataTitle: "オープンデータ・API (β)",
            langNameEn: "英語",
            langNameJa: "日本語",
            langNameZhCN: "中国語",
          },
          "zh-CN": {
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
      UserAgent: "*",
      ...(process.env.SERVER_ENV === "production" ? {
        Allow: "/",
        Sitemap: "https://genshin-dictionary.com/sitemap.xml",
      } : {
        Disallow: "/",
      }),
    },

    sitemap: async () => ({
      hostname: "https://genshin-dictionary.com",
      // disable automatic sitemap generation to exclude URLs without locale:
      // e.g. https://genshin-dictionary.com/about/
      exclude: [ "/**" ],
      gzip: false,
      i18n: true,
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
  };

  return config;
};
