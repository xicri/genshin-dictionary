export default async () => {
  const config = {
    target: "server",
    components: true,
    modern: "client",

    modules: [
      "@nuxtjs/robots",
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
  };

  return config;
};
