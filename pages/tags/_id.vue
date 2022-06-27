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
    const { $pinia, i18n, params, redirect } = useContext();
    const store = useDictionaryStore($pinia);

    const tagID = params.value.id;

    const destTagID = getTagRedirectDestination(tagID);
    if (destTagID) {
      redirect(`/tags/${destTagID}/`);
    }

    const title = ref(`${tags[tagID].title[i18n.locale]} | ${i18n.t("siteTitle")}`);

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
        title.value = i18n.t("siteTitle");
      }
    };

    return {
      onSearch,
    };
  },
  head: {}, // empty head required
});
</script>
