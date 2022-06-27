<template>
  <word-list @search="onSearch" />
</template>

<script>
import { defineComponent, onMounted, ref, useAsync, useContext, useMeta } from "@nuxtjs/composition-api";
import { useDictionaryStore } from "~/store/index.js";
import { getTagRedirectDestination } from "~/libs/redirect.js";
import tags from "~/static/dataset/tags.json";

export default defineComponent({
  setup() {
    const { $pinia, params, redirect } = useContext();
    const store = useDictionaryStore($pinia);

    const tagID = params.value.id;

    const destTagID = getTagRedirectDestination(tagID);
    if (destTagID) {
      redirect(`/tags/${destTagID}/`);
    }

    const title = ref((tags[tagID].title ?? `原神に登場する${tags[tagID].ja}の英語表記一覧`) + " | 原神 英語・中国語辞典");

    useMeta({
      title,
      meta: [
        { hid: "og:title", property: "og:title", content: title.value },
      ],
    });

    useAsync(() => {
      store.$reset();
      store.addTags(tagID);
    });

    onMounted(() => {
      // Reset on browser back
      window.onpopstate = () => {
        store.$reset();
        store.addTags(tagID);
      };
    });

    const onSearch = () => {
      const root = `/${i18n.locale}/`;

      if (window.location.pathname !== root) {
        history.pushState({}, "", root);
        title.value = "原神 英語・中国語辞典";
      }
    };

    return {
      onSearch,
    };
  },
  head: {}, // empty head required
});
</script>
