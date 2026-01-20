<script lang="ts">
  import { resolve } from "$app/paths";
  import HamburgerMenu from "$lib/components/HamburgerMenu.svelte";
  import Spacer from "$lib/components/Spacer.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import "$lib/styles/global.css";
  import type { LayoutProps } from "./$types";

  const { data, children }: LayoutProps = $props();
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

.layout-default {
  &__nav-wrapper {
    display: flex;
    justify-content: center;

    $margin: 12px;
    margin-left: $margin;
    margin-right: $margin;
    width: calc(100% - #{ $margin * 2 });
  }
  &__nav {
    max-width: vars.$max-width;
    width: 100%;
    margin-top: 24px;
    margin-bottom: 36px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }

}
</style>

<svelte:head>
  <meta name="description" content={m.indexTitleDesc()} />
  <meta property="og:description" content={m.indexTitleDesc()} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={m.siteTitle()} />

  <meta name="robots" content={data.allowIndex ? "index, follow" : "noindex, nofollow"} />
</svelte:head>

<div>
  <div class="layout-default__nav-wrapper">
    <nav class="layout-default__nav">
      <h1>
        <a href={resolve("/")} class="flex flex-wrap font-light no-underline text-3xl text-dark tracking-wider">
          <span>{ m.siteTitleL1() }</span><span>{ m.siteTitleL2() }</span>
        </a>
      </h1>

      <Spacer />
      <HamburgerMenu />
    </nav>
  </div>

  {@render children()}
</div>
