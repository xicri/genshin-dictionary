<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import allTags from "$lib/dataset/tags.json";
  import ClosingLayer from "$lib/components/ClosingLayer.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime.js";
  import type { TagID } from "$lib/types.ts";

  type Props = {
    query: string;
    queryTagSlugs: TagID[];
    maxWords: number;
    class: string;
  };

  let {
    query = $bindable(),
    queryTagSlugs = $bindable(),
    maxWords = $bindable(),
    class: twClass,
  }: Props = $props();

  const locale = getLocale();

  let activeTagIDs: TagID[] = $state([]);
  let displayTagListOnMobile = $state(false);

  const inactiveTags = $derived.by(() => {
    const _inactiveTags = structuredClone(allTags);

    for (const activeTagID of activeTagIDs) {
      delete _inactiveTags[activeTagID];
    }

    return _inactiveTags;
  });

  //
  // Event handlers
  //
  const closeTagList = (): void => {
    displayTagListOnMobile = false;
  };
  const toggleTagList = (): void => {
    displayTagListOnMobile = !displayTagListOnMobile;
  };
  const addTag = (tagID: TagID): void => {
    queryTagSlugs.push(tagID);
    maxWords = 100;

    closeTagList();
  };
  const removeTag = (tagIndex: number): void => {
    queryTagSlugs.splice(tagIndex, 1);
    maxWords = 100;
  };
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

.search {
  &__box {
    display: grid;
    grid-template-columns: 1fr 24px;
    align-items: center;

    width: 100%;

    border-bottom-color: vars.$color-dark;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    padding-bottom: 0.5em;
  }

  &__scrollable {
    display: flex;
    overflow-x: scroll;
    width: calc(100% - 0.4em);
    cursor: text;

    // hide scroll bar
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__active-tags {
    display: contents;
    flex-wrap: wrap;
  }
  &__active-tag {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.34em;

    border-width: 2px;
    border-style: solid;
    border-radius: 6px;
    border-color: vars.$color-dark;

    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 4px;
    padding-right: 4px;

    margin-right: 6px;

    color: vars.$color-dark;
    background-color: vars.$color-lightest;

    font-size: vars.$search-font-size;
  }
  &__remove-tag {
    font-weight: 1000;
    cursor: pointer;
  }

  &__taglist {
    border: 0;
  }
  &__taglist-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: baseline;
  }
  &__tag {
    display: block;

    padding-top: 0.2em;
    padding-bottom: 0.2em;
    padding-left: 0.2em;
    padding-right: 0.2em;
    margin-right: 10px;
    margin-bottom: 10px;

    border-width: 2px;
    border-style: solid;
    border-radius: 6px;
    border-color: vars.$color-dark;

    color: vars.$color-dark;
    background-color: vars.$color-lightest;

    font-size: vars.$search-font-size;
    cursor: pointer;
  }
  &__tag-add {
    font-weight: 1000;
  }

  @media (min-width: vars.$max-width) { // PC
    &__taglist {
      // Margin between search box and taglist
      margin-top: 1.2em;
      width: 100%;
    }
    &__taglist-title {
      margin-right: 10px;
    }
    &__taglist-icon,
    &__taglist-close {
      display: none;
    }
  }

  @media (max-width: vars.$max-width) { // Mobile
    &__taglist {
      display: none;

      position: absolute;
      margin-top: 8px;
      right: 0;
      left: 0;
      bottom: 4.8em;

      margin-left: vars.$side-margin;
      margin-right: vars.$side-margin;

      background-color: rgba($color: #ffffff, $alpha: 0.9);
      border-radius: 5px;
      border-color: vars.$color-light;
      border-style: solid;
      border-width: 3px;
      animation: 1s ease-in;
      transition: background-color 0.3s;
    }
    &__taglist-icon {
      flex-grow: 1;
      width: 1.4em;
      height: 1.4em;

      cursor: pointer;
    }
    &__taglist-title {
      display: none;
    }
    &__taglist-close {
      position: absolute;

      width: 24px;
      height: 24px;

      right: -12px;
      top: -12px;

      background-color: #ffffff;

      border-radius: 50%;
      border-color: vars.$color-light;
      border-style: solid;
      border-width: 3px;

      cursor: pointer;
    }

    &__taglist-display-mobile {
      display: block;
    }
    &__taglist-inner {
      display: flex;
      overflow-y: scroll;
      max-height: calc(100vh - 170px);
      padding: 0.5em;
    }
  }
}
</style>

<div class={twMerge("w-full z-20", twClass)}>
  <div class="search__box">
    <div class="search__scrollable content-stretch">
      <div class="search__active-tags">
        {#each queryTagSlugs as queryTagSlug, i (queryTagSlug)}
          <div class="search__active-tag">
            <span>{ allTags[queryTagSlug][locale] }</span>
            <span class="search__remove-tag" onclick={() => removeTag(i)}>☓</span>
          </div>
        {/each}
      </div>

      <div
        bind:innerText={query}
        class="min-w-fit w-full text-nowrap p-1 border-none text-base bg-transparent focus-visible:outline-none focus-visible:outline-0"
        placeholder={m.enterSearchTerms()}
        onclick={(evt) => evt.stopPropagation()}
        contenteditable="plaintext-only"
        data-e2e="search-text"
      ></div>
    </div>

    <img
      src="/vendor/octicons/tag.svg"
      width="24"
      height="24"
      alt={m.openListOfTags()}
      decoding="async"
      class="search__taglist-icon"
      onclick={toggleTagList}
    />
  </div>
  <div class="search__taglist" class:search__taglist-display-mobile={displayTagListOnMobile}>
    <div class="search__taglist-inner">
      <span class="search__taglist-title">{ m.tags() }:</span>
      {#each Object.entries(inactiveTags) as [ id, availableTag ] (id)}
        <span class="search__tag" onclick={() => addTag(id as keyof typeof inactiveTags)}>
          { availableTag[locale] } <span class="search__tag-add">+</span>
        </span>
      {/each}
    </div>

    <img
      src="/vendor/octicons/x.svg"
      width="24"
      height="24"
      alt={m.closeListOfTags()}
      decoding="async"
      class="search__taglist-close"
      onclick={closeTagList}
    />
  </div>
</div>

<ClosingLayer
  enabled={displayTagListOnMobile}
  onclose={closeTagList}
  class="z-10"
/>
