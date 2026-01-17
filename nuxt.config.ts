import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: [ "~/assets/styles/global.scss" ],

  modules: [
    "@nuxtjs/robots",
  ],

  // For nuxt-simple-robots and nuxt-simple-sitemap
  site: {
    url: "https://genshin-dictionary.com",
    indexable: process.env.SERVER_ENV === "production",
  },
});
