<template>
  <div class="word-list">
    <!-- For centering, add empty space which is same size as ads -->
    <div class="word-list__ads"></div>

    <div class="word-list__wrapper">
      <word-list-search class="word-list__search" @search="$emit('search')" />
      <word-list-results :words="searchResults" class="word-list__results" />
    </div>

    <p v-if="searchResults.length <= 0" data-e2e="empty">
      該当する語彙が見つかりませんでした。
    </p>

    <ads class="word-list__ads" />
  </div>
</template>

<script>
import { defineComponent, useContext } from "@nuxtjs/composition-api";
import { storeToRefs } from "pinia";
import { useDictionaryStore } from "~/store/index.js";

export default defineComponent({
  setup() {
    const { $pinia } = useContext();
    const store = useDictionaryStore($pinia);
    const { searchResults } = storeToRefs(store);

    return {
      searchResults,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

.word-list {
  display: flex;
  justify-content: center;
  column-gap: 0.75rem;

  width: 100%;

  &__ads {
    width: 300px;
    height: 250px;
  }

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
