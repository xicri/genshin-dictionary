<template>
  <div class="results__translation">
    <span class="results__langname results__translation-item">{{ langName }}: </span>
    <div class="results__translation-item">
      <div class="results__ja">
        <span v-if="wordWithPinyin" lang="zh-CN" data-e2e="zh-CN" v-html="wordWithPinyin"></span>
        <span v-else :lang="lang" :data-e2e="lang">{{ word }}</span>

        <span v-if="kana" class="results__pronunciation-ja">({{ kana }})</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { escapeHtmlString } from "@/libs/utils";

const props = defineProps({
  lang: {
    type: String,
    required: true,
    validator(val) {
      return [ "en", "ja", "zh-CN" ].includes(val);
    },
  },
  word: {
    type: String,
    required: true,
  },
  kana: {
    type: String,
    default: "",
  },
  pinyins: {
    type: Array,
    default: () => [],
  },
});

const { i18n } = useNuxtApp();
let langName;
let wordWithPinyin;

if (props.lang === "en") {
  langName = i18n.t("langNameEn");
} else if (props.lang === "ja") {
  langName = i18n.t("langNameJa");
} else if (props.lang === "zh-CN") {
  langName = i18n.t("langNameZhCN");
}
if (0 < props.pinyins.length) {
  wordWithPinyin = escapeHtmlString(props.word);
  for (const { char, pron } of props.pinyins) {
    const escapedChar = escapeHtmlString(char);
    const escapedPron = escapeHtmlString(pron);

    wordWithPinyin = wordWithPinyin.replaceAll(escapedChar, `<ruby>${escapedChar}<rp>(</rp><rt class="results__pinyin">${escapedPron}</rt><rp>)</rp></ruby>`);
  }
}
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

.results {
  &__translation {
    display: table-row;
  }

  &__translation-item {
    display: table-cell;
  }

  &__langname {
    font-size: 0.7em;
    width: 4.5em;
  }


  &__ja {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 0.25em;

    width: 100%;
    height: 100%;
  }

  &__pronunciation-ja {
    font-size: 0.7em;
  }
}
</style>

<style lang="scss">
.results {
  &__pinyin {
    font-weight: lighter;
  }
}
</style>
