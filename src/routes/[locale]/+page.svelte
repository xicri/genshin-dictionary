<script lang="ts" setup>
  import type { Locale } from "~/types.ts";

  const { t } = useI18n<[], Locale>();
  const title = `${ t("siteTitle") } ― ${ t("indexTitleDesc") }`;

  useHead({
    title,
    meta: [
      { property: "og:title", content: title },
    ],
  });
</script>

<template>
  <word-list />
</template>
