<template>
  <div class="history">
    <h2>{{ t("historyTitle") }}</h2>
    <div v-for="(words, createdAt) in history" :key="createdAt" class="history__wrapper">
      <h3 class="history__updated-at">
        {{ t("updatedOn", { createdAt: createdAt }) }}
      </h3>
      <word-list-results :words="words" />
    </div>

    <p v-if="empty" class="history__empty">
      {{ t("noRecentUpdates") }}
    </p>
  </div>
</template>

<i18n>
{
  "en": {
    "updatedOn": "Updated on {createdAt}",
    "noRecentUpdates": "No recent updates."
  },
  "ja": {
    "updatedOn": "{createdAt} 更新",
    "noRecentUpdates": "直近の更新はありません。"
  },
  "zh-CN": {
    "updatedOn": "更新于{createdAt}",
    "noRecentUpdates": "无近期更新。"
  }
}
</i18n>

<script lang="ts" setup>
import { isEmpty } from "lodash-es";
import { getHistory } from "~/libs/utils";

const { t } = useI18n();
const title = `${t("historyTitle")} | ${t("siteTitle")}`;

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
  ],
});

const { data: history } = useLazyAsyncData("history", () => getHistory());
const { data: empty } = useLazyAsyncData("empty", () => isEmpty(getHistory()));
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
