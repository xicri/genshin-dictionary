<template>
  <div>
    <h1 class="error__title">
      {{ $t("notfound") }}
    </h1>
    <h2><a href="/">{{ $t("returnToIndex") }}</a></h2>
  </div>
</template>

<i18n>
{
  "en": {
    "notfound": "This page is not found",
    "returnToIndex": "Return to index"
  },
  "ja": {
    "notfound": "このページは存在しません",
    "returnToIndex": "トップページへ戻る"
  }
}
</i18n>

<script>
export default {
  layout: "default",
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

h1, h2 {
  display: block;
  font-weight: 300;
  color: vars.$color-dark;
  letter-spacing: 1px;
  text-align: center;
}

.error {
  &__title {
    font-size: 32px;
    margin: 1vw;
  }
}
</style>
