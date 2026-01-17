import { error } from "@sveltejs/kit";
import { m } from "$lib/paraglide/messages.js";
import { getLocale } from "$lib/paraglide/runtime.js";
import words from "../../../dataset/words.json";
import type { Word } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const word = words.find((word) => word.id === params.wordSlug);

  if (word) {
    const locale = getLocale();

    const meta = locale === "en" ? {
      title: `"${ word.en }" is `
        + (word.zhCN ? `"${ word.zhCN }" in Chinese` : `${ word.ja } in Japanese`)
        + ` | ${ m.siteTitle() }`,
      description: `"${ word.en }" is `
        + (word.zhCN ? `"${ word.zhCN }" in Chinese and ` : "")
        + `"${ word.ja }" in Japanese. This website contains English, Chinese, and Japanese translations for terms in Genshin Impact.`,
    } : locale === "ja" ? {
      title: `「${ word.ja }」は英語で "${ word.en }" | ${ m.siteTitle() }`,
      description: `「${ word.ja }」の英語表記は "${ word.en }"`
        + (word.zhCN ? `、中国語表記は「${ word.zhCN }」` : "")
        + " ― このサイトはゲーム「原神」の用語の、日本語・英語・中国語の対訳を掲載しています。",
    } : locale === "zh-CN" ? {
      title: (word.zhCN ? `"${ word.zhCN }"的英语和日语翻译` : `"${ word.en }"的日语翻译`) + ` | ${ m.siteTitle() }`,
      description: word.zhCN
        ? `"${ word.zhCN }"的英语是"${ word.en }"，日语是"${ word.ja }"。` // TODO TranslationChanged
        : `"${ word.en }"的日语是"${ word.ja }"。`,
    } : locale === "zh-TW" ? {
      title: (word.zhTW ? `"${ word.zhTW }"的英語和日語翻譯` : `"${ word.en }"的日語翻譯`) + ` | ${ m.siteTitle() }`,
      description: word.zhTW
        ? `"${ word.zhTW }"的英語是"${ word.en }"，日語是"${ word.ja }"。` // TODO TranslationChanged
        : `"${ word.en }"的日語是"${ word.ja }"。`,
    } : undefined;

    return {
      word: word as Word,
      ...meta,
    };
  } else {
    error(404, "Not found");
  }
};
