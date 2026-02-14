<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import { escapeHtmlString } from "$lib/utils.ts";
  import type { Locale } from "$lib/paraglide/runtime.js";

  type Props = {
    lang: Locale;
    word: string;
    kana?: string;
    pinyins?: {
      char: string;
      pron: string;
    }[];
  };

  const {
    lang,
    word,
    kana = "",
    pinyins = [],
  }: Props = $props();

  let langName: string;
  let wordWithPinyin: string;

  if (lang === "en") {
    langName = m.langNameEn();
  } else if (lang === "ja") {
    langName = m.langNameJa();
  } else if (lang === "zh-CN") {
    langName = m.langNameZhCN();
  } else if (lang === "zh-TW") {
    langName = m.langNameZhTW();
  }
  if (0 < pinyins.length) {
    wordWithPinyin = escapeHtmlString(word);
    for (const { char, pron } of pinyins) {
      const escapedChar = escapeHtmlString(char);
      const escapedPron = escapeHtmlString(pron);

      wordWithPinyin = wordWithPinyin.replaceAll(escapedChar, `<ruby>${ escapedChar }<rp>(</rp><rt class="results__pinyin">${ escapedPron }</rt><rp>)</rp></ruby>`);
    }
  }
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

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
    white-space: nowrap;
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

<div class="results__translation">
  <span class="results__langname results__translation-item">{ langName }: </span>
  <div class="results__translation-item">
    <div class="results__ja">
      <span lang={lang} data-e2e={lang}>
        {#if wordWithPinyin}
          {@html wordWithPinyin}
        {:else}
          { word }
        {/if}
      </span>

      {#if kana}
        <span class="results__pronunciation-ja">({ kana })</span>
      {/if}
    </div>
  </div>
</div>
