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
