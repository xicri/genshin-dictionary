<template>
  <word-list />
</template>

<script>
import { defineComponent, useMeta } from "@nuxtjs/composition-api";


export default defineComponent({
  setup() {
    const title = "原神 英語・中国語辞典 ― 原神の固有名詞の英語・中国語表記一覧";

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
