<i18n lang="json">
{
  "en": {
    "notfound": "This page is not found",
    "returnToIndex": "Return to index"
  },
  "ja": {
    "notfound": "このページは存在しません",
    "returnToIndex": "トップページへ戻る"
  },
  "zh-CN": {
    "notfound": "页面不存在",
    "returnToIndex": "返回到首页"
  },
  "zh-TW": {
    "notfound": "頁面不存在",
    "returnToIndex": "返回到首頁"
  }
}
</i18n>

<script lang="ts">
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages.js";
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

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

{#if page.status === 404}
  <h1 class="error__title">
    { m.notfound() }
  </h1>
  <h2><a href="/">{ m.returnToIndex() }</a></h2>
{:else}
  <h1>{page.status + (page.error ? `: ${ page.error.message }` : "")}</h1>
{/if}
