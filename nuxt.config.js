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
        "trailing-slash",
      ],
    },

    modules: [
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
            historyTitle: "Update History",
          },
          ja: {
            historyTitle: "更新履歴",
          },
          "zh-CN": {
            historyTitle: "更新记录",
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
