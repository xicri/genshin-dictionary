<script lang="ts">
  import Tag from "$lib/components/Tag.svelte";
  import Translation from "$lib/components/Translation.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale, localizeHref } from "$lib/paraglide/runtime.js";
  import { sleep } from "$lib/utils.ts";
  import type { Word } from "$lib/types.ts";

  type Props = {
    word: Word;
  };

  const { word }: Props = $props();

  const locale = getLocale();
  const wordInCurrentLocale = $derived(word[
    locale === "zh-CN" ? "zhCN"
      : locale === "zh-TW" ? "zhTW"
      : locale
  ] ?? word.en);

  //
  // event handlers
  //
  const copyLink = async (wordId: string, $event: MouseEvent): Promise<void> => {
    await navigator.clipboard.writeText(`https://genshin-dictionary.com/${ wordId }`);

    const copyImg = $event.target as HTMLElement;
    const copiedImg = copyImg?.parentElement?.getElementsByClassName("results__permalink--copied")[0] as HTMLElement;

    if (copiedImg) {
      copyImg.style.display = "none";
      copiedImg.style.display = "inline";
    }

    await sleep(1000);

    copiedImg.style.display = "none";
    copyImg.style.display = "inline";
  };
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

a {
  text-decoration: none;
}

h5 {
  font-size: 12px;
}
h5.linebreak {
  margin-bottom: 0.4em;
}

.results {
  &__word {
    display: flex;
    flex-direction: column;

    padding-top: 16px;
    padding-bottom: 16px;

    border-bottom: 1px solid vars.$color-lighter;

    &:last-child {
      border-bottom: 0 none;
    }
  }

  &__translations {
    display: table;
    border-spacing: 0.2rem;

    font-size: 16px;

    margin-bottom: 0.7em;
  }

  &__description {
    font-size: 12px;
  }
  &__description-section {
    margin-bottom: 1.2em;
  }
  &__description-section-level2 {
    margin-bottom: 0.8em;
  }

  &__example-ref {
    margin-left: 2em;
  }

  &__tags {
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    font-size: 12px;
  }

  &__permalink {
    width: 100%;
    text-align: right;
    margin-top: 8px;

    &--icon {
      width: 1em;
      height: 1em;
    }
    &--text {
      margin-left: 0.34em;
      margin-right: 0.34em;
    }
    &--copy {
      width: 1em;
      height: 1em;
      cursor: pointer;
    }
    &--copied {
      width: 1em;
      height: 1em;
    }
  }
}
</style>

<div class="results__word" data-e2e="word-card">
  <h4 class="results__translations">
    {#if locale === "en"}
      <Translation lang="en" word={word.en} />
      {#if word.zhCN}
        <Translation lang="zh-CN" word={word.zhCN} pinyins={word.pinyins} />
      {/if}
      {#if word.zhTW}
        <Translation lang="zh-TW" word={word.zhTW} />
      {/if}
      {#if word.ja}
        <Translation lang="ja" word={word.ja} kana={word.pronunciationJa} />
      {/if}
    {:else if locale === "ja"}
      {#if word.ja}
        <Translation lang="ja" word={word.ja} kana={word.pronunciationJa} />
      {/if}
      <Translation lang="en" word={word.en} />
      {#if word.zhCN}
        <Translation lang="zh-CN" word={word.zhCN} pinyins={word.pinyins} />
      {/if}
      {#if word.zhTW}
        <Translation lang="zh-TW" word={word.zhTW} />
      {/if}
    {:else if locale === "zh-CN"}
      {#if word.zhCN}
        <Translation lang="zh-CN" word={word.zhCN} pinyins={word.pinyins} />
      {/if}
      {#if word.zhTW}
        <Translation lang="zh-TW" word={word.zhTW} />
      {/if}
      <Translation lang="en" word={word.en} />
      {#if word.ja}
        <Translation lang="ja" word={word.ja} kana={word.pronunciationJa} />
      {/if}
    {:else if locale === "zh-TW"}
      {#if word.zhTW}
        <Translation lang="zh-TW" word={word.zhTW} />
      {/if}
      {#if word.zhCN}
        <Translation lang="zh-CN" word={word.zhCN} pinyins={word.pinyins} />
      {/if}
      <Translation lang="en" word={word.en} />
      {#if word.ja}
        <Translation lang="ja" word={word.ja} kana={word.pronunciationJa} />
      {/if}
    {/if}
  </h4>
  <div class="results__description">
    <div class="results__tags results__description-section">
      {#each word.tags || [] as tag (tag)}
        <a href={localizeHref(`/tags/${ tag }`)} data-e2e="word-card-tag-link">
          <Tag tagid={tag} />
        </a>
      {/each}
    </div>

    {#if word.notes && locale === "ja"}
      <div
        class="results__description-section"
        data-e2e="notes"
      >
        {@html word.notes}
      </div>
    {:else if word.notesEn && locale === "en"}
      <div
        class="results__description-section"
        data-e2e="notesEn"
      >
        {@html word.notesEn}
      </div>
    {:else if word.notesZh && locale === "zh-CN"}
      <div
        class="results__description-section"
        data-e2e="notesZh"
      >
        {@html word.notesZh}
      </div>
    {:else if locale === "zh-TW" && (word.notesZhTW || word.notesZh)}
      <div
        class="results__description-section"
        data-e2e="notesZhTW"
      >
        {@html word.notesZhTW ?? word.notesZh}
      </div>
    {/if}

    {#if word.examples && 0 < word.examples.length}
      <div class="results__description-section">
        <h5 class="linebreak">
          { m.example() }
        </h5>
        {#each word.examples as example (example.en)}
          <div class="results__description-section-level2">
            <p>&quot;{ example.en }&quot;</p>
            <p>「{ example.ja }」</p>
            {#if example.ref && locale === "ja"}
              <p class="results__example-ref">
                {#if example.refURL}
                  ― <a href={example.refURL} target="_blank" rel="noopener">{ example.ref }</a>
                {:else}
                  ― { example.ref }
                {/if}
              </p>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
    <div class="results__permalink">
      <a href={localizeHref(`/${ word.id }`)} data-e2e="word-card-permalink-icon-text">
        <!--
          Approximate values of width & height are specified in HTML to mitigate Comulative Layout Shift,
          but actual values are specified in SCSS.
        -->
        <img
          src="/vendor/octicons/link.svg"
          width="12"
          height="12"
          alt={ m.permalinkAlt({ word: wordInCurrentLocale }) }
          decoding="async"
          class="results__permalink--icon inline -translate-y-0.5"
        />
        <span class="results__permalink--text">{m.permalink()}</span>
      </a>
      &nbsp;&nbsp;
      <img
        src="/vendor/octicons/copy.svg"
        width="12"
        height="12"
        alt={ m.copyLink({ word: wordInCurrentLocale }) }
        decoding="async"
        class="results__permalink--copy inline -translate-y-0.5"
        onclick={(evt) => copyLink(word.id, evt)}
      />
      <img
        src="/vendor/octicons/check.svg"
        width="12"
        height="12"
        alt={ m.copyLinkDone({ word: wordInCurrentLocale }) }
        decoding="async"
        class="results__permalink--copied inline -translate-y-0.5"
        style="display: none;"
      />
    </div>
  </div>
</div>
