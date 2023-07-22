<template>
  <word-list @search="onSearch" />
</template>

<script lang="ts" setup>
import { useDictionaryStore } from "~/store/index";
import type { Locale } from "~/types";

const { $pinia } = useNuxtApp();
const { locale, t } = useI18n<[], Locale>();

const route = useRoute();
const store = useDictionaryStore($pinia);

const onSearch = (): void => {
  if (window.location.pathname !== "/") {
    history.pushState({}, "", `/${locale.value}`);
    document.title = t("siteTitle");
  }
};

store.$reset();
store.queryByID(route.params.wordid);
const word = store.searchResults[0];

if (!word) {
  throw createError({ statusCode: 404, fatal: true });
}

//
// title & description
//
let title;
let description;

if (locale.value === "en") {
  title = `"${word.en}" is ` + (word.zhCN ? `"${word.zhCN}" in Chinese` : `${word.ja} in Japanese`) + ` | ${ t("siteTitle") }`;
  description = `"${word.en}" is `
              + (word.zhCN ? `"${word.zhCN}" in Chinese and ` : "")
              + `"${word.ja}" in Japanese. This website contains English, Chinese, and Japanese translations for terms in Genshin Impact.`;
} else if (locale.value === "ja") {
  title = `「${word.ja}」は英語で "${word.en}" | ${ t("siteTitle") }`;
  description = `「${word.ja}」の英語表記は "${word.en}"`
              + (word.zhCN ? `、中国語表記は「${word.zhCN}」` : "")
              + " ― このサイトはゲーム「原神」の用語の、日本語・英語・中国語の対訳を掲載しています。";
} else if (locale.value === "zh-CN") {
  title = (word.zhCN ? `"${word.zhCN}"的英语和日语翻译` : `"${word.en}"的日语翻译`) + ` | ${ t("siteTitle") }`;
  description = word.zhCN ?
    `"${word.zhCN}"的英语是"${word.en}"，日语是"${word.ja}"。` : // TODO TranslationChanged
    `"${word.en}"的日语是"${word.ja}"。`;
} else {
  throw new Error(`Unexpected locale: ${locale.value}`);
}

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
    { hid: "description", name: "description", content: description },
    { hid: "og:description", property: "og:description", content: description },
  ],
});

onMounted(() => {
  // Reset on browser back
  window.onpopstate = () => {
    store.$reset();
    store.queryByID(word.id);
  };
});
</script>
