<script lang="ts">
  import { isEmptyObject } from "es-toolkit";
  import { m } from "$lib/paraglide/messages.js";
  import WordCard from "$lib/components/WordCard.svelte";
  import _history from "$lib/dataset/build/history.ts";

  const title = `${ m.historyTitle() } | ${ m.siteTitle() }`;

  const history = _history;
  const empty = isEmptyObject(_history);
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

.history {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  &__wrapper {
    max-width: vars.$max-width;
    width: 100%;
  }

  &__updated-at {
    display: flex;
    align-items: center;
    &:after {
      border-top: 1px solid vars.$color-dark;
      content: "";
      flex-grow: 1;
      margin-left: 0.4em;
      // By default, align-items: center does not center the line perfectly.
      // By adding margin-top, I can center the line more accurately.
      margin-top: 0.25em;
    }
  }

  &__empty {
      color: vars.$color-dark;
  }
}

@media (max-width: vars.$max-width) { // Mobile
  .history {
    padding-left: vars.$side-margin;
    padding-right: vars.$side-margin;

    // Avoid overwrap when the user scrolled at the bottom of the page
    margin-bottom: 11em;

    &__wrapper {
      margin-bottom: 4em;
    }
  }
}
</style>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<div class="history">
  <h2>{ m.historyTitle() }</h2>
  {#each Object.entries(history) as [ createdAt, words ] (createdAt)}
    <div class="history__wrapper">
      <h3 class="history__updated-at">
        { m.updatedOn({ createdAt }) }
      </h3>

      {#each words as word (word.id)}
        <WordCard {word} />
      {/each}
    </div>
  {/each}

  {#if empty}
    <p class="history__empty">
      { m.noRecentUpdates() }
    </p>
  {/if}
</div>
