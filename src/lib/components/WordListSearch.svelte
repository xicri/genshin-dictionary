<i18n lang="json">
{
  "en": {
    "enterSearchTerms": "Enter search terms...",
    "tags": "Tags",
    "openListOfTags": "Open the list of tags",
    "closeListOfTags": "Close the list of tags"
  },
  "ja": {
    "enterSearchTerms": "検索ワードを入力…",
    "tags": "タグ",
    "openListOfTags": "タグ一覧を開く",
    "closeListOfTags": "タグ一覧を閉じる"
  },
  "zh-CN": {
    "enterSearchTerms": "输入搜索关键词…",
    "tags": "标签",
    "openListOfTags": "打开标签列表",
    "closeListOfTags": "收起标签列表"
  },
  "zh-TW": {
    "enterSearchTerms": "輸入搜尋關鍵字…",
    "tags": "標籤",
    "openListOfTags": "開啟標籤列表",
    "closeListOfTags": "關閉標籤列表"
  }
}
</i18n>

<script lang="ts">
  import { klona } from "klona/json";
  import { debounce } from "lodash-es";
  import { storeToRefs } from "pinia";
  import allTags from "../../../dataset/tags.json";
  import { useDictionaryStore } from "~/store/index.ts";
  import ClosingLayer from "$lib/components/ClosingLayer.svelte";
  import ElasticSearchBox from "$lib/components/ElasticSearchBox.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime.js";
  import type { TagID } from "$lib/types.ts";
  import type { FormEventHandler } from "svelte/elements";

  type Props = {
    onsearch?: () => void;
  };

  const { onsearch }: Props = $props();

  const { $pinia } = useNuxtApp();
  const store = useDictionaryStore($pinia);

  const locale = getLocale();

  let searchBox: typeof ElasticSearchBox.prototype | undefined;
  const { tags } = storeToRefs(store);
  let displayTagListOnMobile = $state(false);

  const availableTags = $derived.by(() => {
    const _availableTags = klona(allTags);

    for (const searchTag of tags.value) {
      delete _availableTags[searchTag];
    }

    return _availableTags;
  });

  //
  // Event handlers
  //
  const updateSearchQuery: FormEventHandler<HTMLInputElement> = debounce(((evt) => {
    store.updateSearchQuery((evt.target as HTMLInputElement)?.value);
    if (onsearch) {
      onsearch();
    }
  }) as FormEventHandler<HTMLInputElement>, 500);
  const focusOnSearchBox = (): void => {
    if (searchBox) {
      const searchBoxTextLength = searchBox.getTextLength() ?? null;

      searchBox.setSelectionRange(searchBoxTextLength, searchBoxTextLength);
      searchBox.focus();
    }
  };
  const selectAll = (): void => {
    if (searchBox) {
      searchBox.setSelectionRange(0, searchBox.getTextLength() ?? null);
      searchBox.focus();
    }
  };
  const closeTagList = (): void => {
    displayTagListOnMobile = false;
  };
  const toggleTagList = (): void => {
    displayTagListOnMobile = !displayTagListOnMobile;
  };
  const addTag = (tagID: TagID): void => {
    store.addTags(tagID);
    if (onsearch) {
      onsearch();
    }
    closeTagList();
  };
  const removeTag = (tagIndex: number): void => {
    store.removeTag(tagIndex);
    if (onsearch) {
      onsearch();
    }
  };
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

.search {
  width: 100%;

  & * {
    z-index: 11; // Higher than closing-layer (z-index: 10)
  }

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

  &__input {
    flex-shrink: 0;
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

<div class="search">
  <div class="search__box">
    <div class="search__scrollable" onclick={focusOnSearchBox} ondblclick={selectAll}>
      <div class="search__active-tags">
        {#each tags as tag, i (tag)}
          <div class="search__active-tag">
            <span>{ allTags[tag][locale] }</span>
            <span class="search__remove-tag" onclick={() => removeTag(i)}>☓</span>
          </div>
        {/each}
      </div>

      <ElasticSearchBox
        bind:this={searchBox}
        class="search__input"
        name="searchbox"
        placeholder={m.enterSearchTerms()}
        autocomplete="off"
        oninput={updateSearchQuery}
      />
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
      {#each Object.entries(availableTags) as [ id, availableTag ] (id)}
        <span class="search__tag" onclick={() => addTag(id as keyof typeof availableTags)}>
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

<ClosingLayer enabled={displayTagListOnMobile} onclose={closeTagList} />
