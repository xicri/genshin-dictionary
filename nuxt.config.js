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
    target: "static",
    components: true,
    modern: "client",

    head: {
      htmlAttrs: { lang: "ja" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "原神に登場する固有名詞の英和・和英辞典です。" },
        { hid: "og:description", property: "og:description", content: "原神に登場する固有名詞の英和・和英辞典です。" },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:locale", property: "og:locale", content: "ja_JP" },
        { hid: "og:site_name", property: "og:site_name", content: "原神 英語・中国語辞典" },
        { hid: "twitter:card", property: "twitter:card", content: "summary" },
        { hid: "twitter:site", property: "twitter:site", content: "@xicri_gi" },
        { hid: "twitter:creator", property: "twitter:creator", content: "@xicri_gi" },
        { hid: "google-site-verification", name: "google-site-verification", content: "fPZCIib8QFE52LeBEGqBoapTwL6v9vqHl9lKqcreMDQ" },
      ],
      script: [],
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
    },

    modules: [
      "@nuxtjs/robots",
      "@nuxtjs/sentry",
      "@nuxtjs/sitemap",
    ],
    buildModules: [
      "@nuxtjs/composition-api/module",
      "@pinia/nuxt",
      "nuxt-canonical-ogurl",
    ],

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

        { url: "/teachings-of-transience", lastmod: "2022-03-19T13:30:00.000Z" },
        { url: "/electro-crystalfly", lastmod: "2022-03-19T13:30:00.000Z" },
        // Redirect error
        { url: "/dmg", lastmod: "2022-01-23T11:30:00.000Z" },
      ],
    }),

    canonicalOgUrl: {
      baseURL: "https://genshin-dictionary.com",
    },
  };

  if (process.env.NODE_ENV === "production") {
    config.head.script.push({
      hid: "cloudflare-wa",
      src: "https://static.cloudflareinsights.com/beacon.min.js",
      "data-cf-beacon": "{\"token\": \"59caa95b4e654d118af6761046577a6b\"}",
      defer: true,
      body: true,
    });
  }

  return config;
};
