<template>
  <word-list @search="onSearch" />
</template>

<script setup>
import { useDictionaryStore } from "~/store/index.js";
import tags from "~/dataset/tags.json";

const { $pinia } = useNuxtApp();
const { locale, t } = useI18n({
  useScope: "local",
});
const route = useRoute();
const store = useDictionaryStore($pinia);

const tagID = route.params.id;

const title = ref(`${tags[tagID].title[locale.value]} | ${t("siteTitle")}`);

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
  const root = `/${locale.value}`;

  if (window.location.pathname !== root) {
    history.pushState({}, "", root);
    title.value = t("siteTitle");
  }
};
</script>
