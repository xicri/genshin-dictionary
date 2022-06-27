<template>
  <word-list />
</template>

<script>
import { defineComponent, useContext, useMeta } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const { i18n } = useContext();
    const title = `${ i18n.t("siteTitle") } ― ${ i18n.t("indexTitleDesc") }`;

    useMeta({
      title,
      meta: [
        { hid: "og:title", property: "og:title", content: title },
      ],
    });
  },
  head: {}, // empty head required
});
</script>
