<template>
  <word-list @search="onSearch" />
</template>

<script setup>
import { useDictionaryStore } from "~/store/index.js";
import { getTagRedirectDestination } from "~/libs/redirect.js";
import tags from "~/dataset/tags.json";

const { $pinia, i18n, redirect } = useNuxtApp();
const route = useRoute();
const store = useDictionaryStore($pinia);

const tagID = route.params.id;

const destTagID = getTagRedirectDestination(tagID);
if (destTagID) {
  redirect(`/tags/${destTagID}/`);
}

const title = ref(`${tags[tagID].title[i18n.locale]} | ${i18n.t("siteTitle")}`);

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
  const root = `/${i18n.locale}/`;

  if (window.location.pathname !== root) {
    history.pushState({}, "", root);
    title.value = i18n.t("siteTitle");
  }
};
</script>
