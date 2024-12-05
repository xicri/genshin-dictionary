<template>
  <div>
    <div class="search">
      <div class="search__box">
        <div class="search__scrollable" @click="focusOnSearchBox" @dblclick="selectAll">
          <div class="search__active-tags">
            <div v-for="(tag, i) in tags" :key="tag" class="search__active-tag">
              <span>{{ allTags[tag][locale] }}</span>
              <span class="search__remove-tag" @click="removeTag(i)">☓</span>
            </div>
          </div>

          <elastic-searchbox ref="searchBox" class="search__input" name="searchbox" :placeholder="t('enterSearchTerms')" autocomplete="off" @input="updateSearchQuery" />
        </div>

        <img
          src="~/assets/vendor/octicons/tag.svg"
          width="24"
          height="24"
          :alt="t('openListOfTags')"
          decoding="async"
          class="search__taglist-icon"
          @click="toggleTagList"
        />
      </div>
      <div ref="taglist" :class="{ search__taglist: true, 'search__taglist-display-mobile': displayTagListOnMobile }">
        <div class="search__taglist-inner">
          <span class="search__taglist-title">{{ t("tags") }}:</span>
          <span v-for="(availableTag, id) in AvailableTags" :key="id" class="search__tag" @click="addTag(id)">
            {{ availableTag[locale] }} <span class="search__tag-add">+</span>
          </span>
        </div>

        <img
          src="~/assets/vendor/octicons/x.svg"
          width="24"
          height="24"
          :alt="t('closeListOfTags')"
          decoding="async"
          class="search__taglist-close"
          @click="closeTagList"
        />
      </div>
    </div>
    <closing-layer :enabled="displayTagListOnMobile" @close="closeTagList" />
  </div>
</template>

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
  }
}
</i18n>

<script lang="ts" setup>
import { klona } from "klona/json";
import { debounce } from "lodash-es";
import { storeToRefs } from "pinia";
import allTags from "~/dataset/tags.json";
import { useDictionaryStore } from "~/store/index.ts";
import type ElasticSearchbox from "~/components/elastic-searchbox.vue";
import type { Locale, TagID } from "~/types";

const emit = defineEmits([ "search" ]);
const { $pinia } = useNuxtApp();
const store = useDictionaryStore($pinia);

const { locale, t } = useI18n<[], Locale>({
  useScope: "local",
});

//
// Refs
//
const searchBox = ref<InstanceType<typeof ElasticSearchbox>|null>(null);
const { tags } = storeToRefs(store);
const displayTagListOnMobile = ref(false);

//
// Computed
//
const AvailableTags = computed(() => {
  const availableTags = klona(allTags);

  for (const searchTag of tags.value) {
    delete availableTags[searchTag];
  }

  return availableTags;
});

//
// Event handlers
//
const updateSearchQuery = debounce((evt) => {
  store.updateSearchQuery(evt.target.value);
  emit("search");
}, 500);
const focusOnSearchBox = (): void => {
  const el = searchBox.value?.$el;
  if (el) {
    el.setSelectionRange(el.value.length, el.value.length);
    el.focus();
  }
};
const selectAll = (): void => {
  const el = searchBox.value?.$el;
  if (el) {
    el.setSelectionRange(0, el.value.length);
    el.focus();
  }
};
const closeTagList = (): void => {
  displayTagListOnMobile.value = false;
};
const toggleTagList = (): void => {
  displayTagListOnMobile.value = !displayTagListOnMobile.value;
};
const addTag = (tagID: TagID): void => {
  store.addTags(tagID);
  emit("search");
  closeTagList();
};
const removeTag = (tagIndex: number): void => {
  store.removeTag(tagIndex);
  emit("search");
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

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
    width: 100%;
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
