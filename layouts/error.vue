<template>
  <div>
    <h1 class="error__title">
      このページは存在しません
    </h1>
    <h2><a href="/">トップページへ戻る</a></h2>
  </div>
</template>

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
