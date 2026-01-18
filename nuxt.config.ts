import { defineNuxtConfig } from "nuxt/config";
import tags from "./dataset/tags.json" with { type: "json" };
import words from "./dataset/words.json" with { type: "json" };
import type { LocaleObject } from "@nuxtjs/i18n";
import type { Word } from "./types.ts";

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
  css: [ "~/assets/styles/global.scss" ],

  modules: [
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@pinia/nuxt",
  ],

  sitemap: {
    autoLastmod: false,
    cacheMaxAgeSeconds: 0, // disable cache
    urls: [
      ...(locales.map(({ code: locale }) => [
        { loc: `/${ locale }` },
        { loc: `/${ locale }/history` },
        { loc: `/${ locale }/about` },
        { loc: `/${ locale }/opendata` },
        ...((words as Word[]).map((word) => ({ loc: `/${ locale }/${ word.id }`, lastmod: word.updatedAt }))),
        ...(tagIDs.map((tagID) => ({ loc: `/${ locale }/tags/${ tagID }` }))),
      ]).flat()),
    ],
    exclude: [
      "/",
    ],
  },

  // For nuxt-simple-robots and nuxt-simple-sitemap
  site: {
    url: "https://genshin-dictionary.com",
    indexable: process.env.SERVER_ENV === "production",
  },
});
