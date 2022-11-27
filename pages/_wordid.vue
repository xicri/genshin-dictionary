<template>
  <word-list @search="onSearch" />
</template>

<script>
import { defineComponent, onMounted, useContext, useMeta } from "@nuxtjs/composition-api";
import { getWordRedirectDestination } from "~/libs/redirect.js";
import { useDictionaryStore } from "~/store/index.js";

export default defineComponent({
  setup() {
    const { $pinia, i18n, params, redirect } = useContext();
    const store = useDictionaryStore($pinia);

    const onSearch = () => {
      if (window.location.pathname !== "/") {
        history.pushState({}, "", `/${i18n.locale}/`);
        document.title = i18n.t("siteTitle");
      }
    };

    const destWordID = getWordRedirectDestination(params.value.wordid);
    if (destWordID) {
      redirect(301, `/${i18n.locale}/${destWordID}/`);
    }

    store.$reset();
    store.queryByID(params.value.wordid);
    const word = store.searchResults[0];

    if (!word) {
      const { error } = useContext();
      error({ statusCode: 404 });
      return;
    }

    //
    // title & description
    //
    let title;
    let description;

    if (i18n.locale === "en") {
      title = `"${word.en}" is ` + (word.zhCN ? `"${word.zhCN}" in Chinese` : `${word.ja} in Japanese`) + ` | ${ i18n.t("siteTitle") }`;
      description = `"${word.en}" is `
                  + (word.zhCN ? `"${word.zhCN}" in Chinese and ` : "")
                  + `"${word.ja}" in Japanese. This website contains English, Chinese, and Japanese translations for terms in Genshin Impact.`;
    } else if (i18n.locale === "ja") {
      title = `「${word.ja}」は英語で "${word.en}" | ${ i18n.t("siteTitle") }`;
      description = `「${word.ja}」の英語表記は "${word.en}"`
                  + (word.zhCN ? `、中国語表記は「${word.zhCN}」` : "")
                  + " ― このサイトはゲーム「原神」の用語の、日本語・英語・中国語の対訳を掲載しています。";
    } else if (i18n.locale === "zh-CN") {
      title = (word.zhCN ? `"${word.zhCN}"的英语和日语翻译` : `"${word.en}"的日语翻译`) + ` | ${ i18n.t("siteTitle") }`;
      description = word.zhCN ?
        `"${word.zhCN}"的英语是"${word.en}"，日语是"${word.ja}"。` : // TODO TranslationChanged
        `"${word.en}"的日语是"${word.ja}"。`;
    } else {
      throw new Error(`Unexpected locale: ${i18n.locale}`);
    }

    useMeta({
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

    return {
      onSearch,
    };
  },
  head: {},
});
</script>
