<script lang="ts">
  import { onMount } from "svelte";
  import { debounce } from "lodash-es";
  import WordListSearch from "$lib/components/WordListSearch.svelte";
  import WordCard from "$lib/components/WordCard.svelte";
  import { searchWords } from "$lib/search.ts";
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime.js";
  import type { TagID } from "$lib/types.ts";

  type Props = {
    tagSlug?: TagID;
  };

  const { tagSlug }: Props = $props();

  let query: string = $state("");
  let queryTagSlugs: TagID[] = $state(tagSlug ? [ tagSlug ] : []);
  let maxWords: number = $state(100);

  const locale = getLocale();

  const words = $derived(searchWords({
    query,
    queryTagSlugs,
    maxWords,
    locale,
  }));

  let resultsElement: HTMLElement;

  const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        return;
      }

      observer.unobserve(entry.target);
      maxWords += 100;
    }
  });

  const addIntersectionObserver = (): void => {
    const wordEls = resultsElement.children;

    if (wordEls && 0 < wordEls.length) {
      observer?.observe(wordEls[wordEls.length - 1]); // add observer to the last word element
    }
  };

  onMount(() => {
    const reset = () => {
      query = "";
      queryTagSlugs = tagSlug ? [ tagSlug ] : [];
      maxWords = 100;
    };

    // Reset on browser back
    window.onpopstate = reset;

    addIntersectionObserver();
  });

  $effect(() => addIntersectionObserver());
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

  &__results {
    width: 100%;
  }
}

@media (max-width: vars.$max-width) { // Mobile
  .word-list {
    // Avoid overwrap when the user scrolled at the bottom of the page
    margin-bottom: 11em;

    &__wrapper {
      margin-bottom: 4em;
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
    <WordListSearch
      class="pt-4 pb-4 padding-side md:pl-0 md:pr-0 fixed md:static bottom-0 md:bottom-auto w-full md:w-auto bg-lightest md:bg-transparent shadow-md md:shadow-none"
      bind:query={() => query, debounce((newQuery) => query = newQuery, 500) }
      bind:queryTagSlugs={queryTagSlugs}
      bind:maxWords={maxWords}
    />

    <main bind:this={resultsElement} class="word-list__results">
      {#each words as word (word.en)}
        <WordCard {word} />
      {/each}
    </main>
  </div>

  {#if words.length <= 0}
    <p data-e2e="empty">
      { m.notFound() }
    </p>
  {/if}
</div>
