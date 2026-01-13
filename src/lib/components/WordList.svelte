<script lang="ts">
  import { storeToRefs } from "pinia";
  import { useDictionaryStore } from "~/store/index.ts";
  import WordListSearch from "$lib/components/WordListSearch.svelte";
  import WordCard from "$lib/components/WordCard.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime.js";

  type Props = {
    onsearch?: () => void;
  };

  const { onsearch }: Props = $props();

  const { $pinia } = useNuxtApp();
  const locale = getLocale();
  const store = useDictionaryStore($pinia);
  store.setLocale(locale);
  const { searchResults } = storeToRefs(store);
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

.word-list {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  &__wrapper {
    max-width: vars.$max-width;
    width: 100%;
  }

  &__search {
    padding-top: 1em;
    padding-bottom: 1.2em;

    // avoid overwrapping search bar by Google AdSense
    z-index: 1;
  }
}

@media (max-width: vars.$max-width) { // Mobile
  .word-list {
    // Avoid overwrap when the user scrolled at the bottom of the page
    margin-bottom: 11em;

    &__wrapper {
      margin-bottom: 4em;
    }

    // Show search component at the bottom of the page on mobile devices
    &__search {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding-left: vars.$side-margin;
      padding-right: vars.$side-margin;
      background-color: vars.$color-lightest;
      box-shadow: 0 -0.2rem 5px #00000030;
    }

    &__results {
      padding-left: vars.$side-margin;
      padding-right: vars.$side-margin;
    }
  }
}
</style>

<div class="word-list">
  <div class="word-list__wrapper">
    <WordListSearch class="word-list__search" {onsearch} />
    <WordCard words={searchResults} class="word-list__results" />
  </div>

  {#if searchResults.length <= 0}
    <p data-e2e="empty">
      { m.notFound() }
    </p>
  {/if}
</div>
