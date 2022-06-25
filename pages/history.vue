<template>
  <div class="history">
    <h2>更新履歴</h2>
    <div v-for="(words, createdAt) in history" :key="createdAt" class="history__wrapper">
      <h3 class="history__updated-at">
        {{ createdAt }}更新
      </h3>
      <word-list-results :words="words" />
    </div>

    <p v-if="empty" class="history__empty">
      直近の更新はありません。
    </p>
  </div>
</template>

<script>
import { defineComponent, useAsync, useMeta } from "@nuxtjs/composition-api";
import { isEmpty } from "lodash";
import { getHistory } from "~/libs/utils";

export default defineComponent({
  setup() {
    const title = "更新履歴 | 原神 英語・中国語辞典";

    useMeta({
      title,
      meta: [
        { hid: "og:title", property: "og:title", content: title },
      ],
    });

    const history = useAsync(() => getHistory());

    return {
      history,
      empty: useAsync(() => isEmpty(history.value)),
    };
  },
  head: {}, // empty head required
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

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
