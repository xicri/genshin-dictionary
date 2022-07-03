<template>
  <word-list />
</template>

<script setup>
const { i18n } = useContext();
const title = `${ i18n.t("siteTitle") } ― ${ i18n.t("indexTitleDesc") }`;

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
  ],
});
</script>
