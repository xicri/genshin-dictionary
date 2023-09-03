<template>
  <word-list />
</template>

<script lang="ts" setup>
const { t } = useI18n();
const title = `${ t("siteTitle") } ― ${ t("indexTitleDesc") }`;

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
  ],
});
</script>
