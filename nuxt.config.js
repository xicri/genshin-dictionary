import TerserPlugin from "terser-webpack-plugin";

import words from "./static/dataset/words.json";
import tags from "./static/dataset/tags.json";

export default async () => {
  async function routes() {
    const tagIDs = Object.keys(tags);

    return [
      "/",
      ...(words.map(word => `/${word.id}/`)),
      ...(tagIDs.map(tagID => `/tags/${tagID}/`)),
    ];
  }

  const config = {
    target: "server",
    components: true,
    modern: "client",

    head() {
      if (!this.$nuxtI18nHead) {
        return {};
      }

      const { htmlAttrs, meta, link } = this.$nuxtI18nHead({ addSeoAttributes: true });
      const { lang } = htmlAttrs;

      const siteName = lang === "en" ? "Genshin Dictionary" : "原神英語・中国語辞典";
      const description = lang === "en"
        ? "An online English-Japanese dictionary for proprietary nouns in Genshin Impact"
        : "原神に登場する固有名詞の英和・和英辞典です。";

      return {
        htmlAttrs,
        meta: [
          { charset: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "format-detection", content: "telephone=no" },
          { hid: "description", name: "description", content: description },
          { hid: "og:description", property: "og:description", content: description },
          { hid: "og:type", property: "og:type", content: "website" },
          { hid: "og:site_name", property: "og:site_name", content: siteName },
          { hid: "twitter:card", property: "twitter:card", content: "summary" },
          { hid: "twitter:site", property: "twitter:site", content: "@xicri_gi" },
          { hid: "twitter:creator", property: "twitter:creator", content: "@xicri_gi" },
          { hid: "google-site-verification", name: "google-site-verification", content: "fPZCIib8QFE52LeBEGqBoapTwL6v9vqHl9lKqcreMDQ" },
          ...meta,
        ],
        link,
        script: [
          ...(process.env.NODE_ENV === "production" ? [{
            hid: "cloudflare-wa",
            src: "https://static.cloudflareinsights.com/beacon.min.js",
            "data-cf-beacon": "{\"token\": \"59caa95b4e654d118af6761046577a6b\"}",
            defer: true,
            body: true,
          }] : []),
        ],
      };
    },

    css: [ "~/assets/styles/global.scss" ],

    build: {
      optimization: {
        splitChunks: {
          chunks: "all",
        },
        sideEffects: false,
        usedExports: true,
        // Do not make symbol names unreadable for performance analysis
        minimizer: [ new TerserPlugin({
          terserOptions: {
            compress: {
              keep_classnames: true,
              keep_fargs: true,
              keep_fnames: true,
            },
            mangle: {
              keep_classnames: true,
              keep_fnames: true,
            },
            keep_classnames: true,
            keep_fnames: true,
          },
        }) ],
      },
    },
    generate: {
      fallback: "404.html",
      routes,
    },
    router: {
      trailingSlash: true,
      middleware: "trailing-slash",
    },

    modules: [
      "@nuxtjs/i18n",
      "@nuxtjs/robots",
      "@nuxtjs/sentry",
      "@nuxtjs/sitemap",
    ],
    buildModules: [
      "@nuxtjs/composition-api/module",
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
        // {
        //   code: "zh-CN",
        //   iso: "zh-CN",
        //   name: "简体中文",
        // },
      ],
      strategy: "prefix",
      defaultLocale: "en",
      baseUrl: "https://genshin-dictionary.com",
      vueI18nLoader: true,
      vueI18n: {
        fallbackLocale: "en",
      },
    },

    robots: {
      UserAgent: "*",
      ...(process.env.NODE_ENV === "production" ? {
        Allow: "/",
        Sitemap: "https://genshin-dictionary.com/sitemap.xml",
      } : {
        Disallow: "/",
      }),
    },

    sentry: {
      dsn: "https://1588b1ae11f340479b57e3913b92d72f@o287069.ingest.sentry.io/5887130",
      disableServerSide: true,
      config: {
        environment: process.env.NODE_ENV || "local",
      },
    },

    sitemap: async () => ({
      hostname: "https://genshin-dictionary.com",
      gzip: false,
      routes: [
        ...(words.map(word => ({ url: `/${word.id}/`, lastmod: word.updatedAt }))),
        ...(Object.keys(tags).map(tagID => ({ url: `/tags/${tagID}/` }))),
      ],
    }),
  };

  return config;
};
