<template>
  <word-list />
</template>

<script>
export default defineComponent({
  setup() {
    const title = "原神 英語・中国語辞典 ― 原神の固有名詞の英語・中国語表記一覧";

    useHead({
      title,
      meta: [
        { hid: "og:title", property: "og:title", content: title },
      ],
    });
  },
});
</script>
