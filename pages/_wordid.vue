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
        document.title = "原神 英語・中国語辞典";
      }
    };

    const destWordID = getWordRedirectDestination(params.value.wordid);
    if (destWordID) {
      redirect(`/${destWordID}/`);
    }

    store.$reset();
    store.queryByID(params.value.wordid);
    const word = store.searchResults[0];

    if (!word) {
      const { error } = useContext();
      error({ statusCode: 404 });
      return;
    }

    const title = `「${word.ja}」は英語で "${word.en}" | 原神 英語・中国語辞典`;
    const description = `「${word.ja}」の英語表記は "${word.en}"`;

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
