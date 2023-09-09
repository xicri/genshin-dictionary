<template>
  <word-list @search="onSearch" />
</template>

<script lang="ts" setup>
import { useDictionaryStore } from "~/store/index";
import tags from "~/dataset/tags.json";
import type { RouteLocationNormalizedLoaded } from "#vue-router";
import type { Locale, TagID } from "~/types";

const getTagIdFromParams = (route: RouteLocationNormalizedLoaded): TagID => {
  const tagID = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  if (!Object.keys(tags).includes(tagID)) { // unexpected tagID given
    throw createError({ statusCode: 404, fatal: true });
  }

  return <TagID>tagID;
};

const { $pinia } = useNuxtApp();
const { locale, t } = useI18n<[], Locale>({
  useScope: "local",
});
const route = useRoute();
const store = useDictionaryStore($pinia);

const tagID = getTagIdFromParams(route);
const title = ref(`${tags[tagID].title[locale.value]} | ${t("siteTitle")}`);

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title.value },
  ],
});

useLazyAsyncData("initTag", async () => {
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

const onSearch = (): void => {
  const root = `/${locale.value}`;

  if (window.location.pathname !== root) {
    history.pushState({}, "", root);
    title.value = t("siteTitle");
  }
};
</script>
