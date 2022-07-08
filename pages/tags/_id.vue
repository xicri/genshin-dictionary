<template>
  <word-list @search="onSearch" />
</template>

<script>
import { useDictionaryStore } from "~/store/index.js";
import tags from "~/static/dataset/tags.json";

export default defineComponent({
  setup() {
    const { $pinia, params } = useNuxtApp();
    const store = useDictionaryStore($pinia);

    const tagID = params.value.id;
    const title = ref((tags[tagID].title ?? `原神に登場する${tags[tagID].ja}の英語表記一覧`) + " | 原神 英語・中国語辞典");

    useHead({
      title,
      meta: [
        { hid: "og:title", property: "og:title", content: title.value },
      ],
    });

    useLazyAsyncData("initTag", () => {
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
      if (window.location.pathname !== "/") {
        history.pushState({}, "", "/");
        title.value = "原神 英語・中国語辞典";
      }
    };

    return {
      onSearch,
    };
  },
});
</script>
