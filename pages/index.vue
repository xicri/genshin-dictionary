<template>
  <word-list />
</template>

<script lang="ts" setup>
import type { Locale } from "~/types";

const { t } = useI18n<[], Locale>();
const title = `${ t("siteTitle") } ― ${ t("indexTitleDesc") }`;

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
  ],
});
</script>
