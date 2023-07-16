<template>
  <main class="results">
    <div v-for="word in words" :key="word.en" ref="wordList" class="results__word">
      <h4 class="results__translations">
        <template v-if="locale === 'en'">
          <translation lang="en" :word="word.en" />
          <translation v-if="word.zhCN" lang="zh-CN" :word="word.zhCN" :pinyins="word.pinyins" />
          <translation v-if="word.ja" lang="ja" :word="word.ja" :kana="word.pronunciationJa" />
        </template>
        <template v-if="locale === 'ja'">
          <translation v-if="word.ja" lang="ja" :word="word.ja" :kana="word.pronunciationJa" />
          <translation lang="en" :word="word.en" />
          <translation v-if="word.zhCN" lang="zh-CN" :word="word.zhCN" :pinyins="word.pinyins" />
        </template>
        <template v-if="locale === 'zh-CN'">
          <translation v-if="word.zhCN" lang="zh-CN" :word="word.zhCN" :pinyins="word.pinyins" />
          <translation lang="en" :word="word.en" />
          <translation v-if="word.ja" lang="ja" :word="word.ja" :kana="word.pronunciationJa" />
        </template>
      </h4>
      <div class="results__description">
        <div class="results__tags results__description-section">
          <a v-for="tag in word.tags" :key="tag" :href="localePath(`/tags/${tag}`)">
            <tag :tagid="tag" />
          </a>
        </div>
        <div v-if="word.notes && locale === 'ja'" class="results__description-section" data-e2e="notes" v-html="word.notes" />
        <div v-if="word.notesZh && locale === 'zh-CN'" class="results__description-section" data-e2e="notesZh" v-html="word.notesZh" />
        <div v-if="word.examples && 0 < word.examples.length" class="results__description-section">
          <h5 class="linebreak">
            {{ t("example") }}
          </h5>
          <div v-for="example in word.examples" :key="example.en" class="results__description-section-level2">
            <p>&quot;{{ example.en }}&quot;</p>
            <p>「{{ example.ja }}」</p>
            <template v-if="example.ref && locale === 'ja'">
              <p class="results__example-ref">
                <template v-if="example.refURL">
                  ― <a :href="example.refURL" target="_blank" rel="noopener">{{ example.ref }}</a>
                </template>
                <template v-else>
                  ― {{ example.ref }}
                </template>
              </p>
            </template>
          </div>
        </div>
        <div class="results__permalink">
          <a :href="localePath(`/${word.id}`)">
            <!--
              Approximate values of width & height are specified in HTML to mitigate Comulative Layout Shift,
              but actual values are specified in SCSS.
            -->
            <img
              src="~/assets/vendor/octicons/link.svg"
              width="12"
              height="12"
              :alt="t('permalinkAlt', { word: word[locale] })"
              decoding="async"
              class="results__permalink--icon"
            />
            <span class="results__permalink--text">{{ t("permalink") }}</span>
          </a>
          <img
            src="~/assets/vendor/octicons/copy.svg"
            width="12"
            height="12"
            :alt="t('copyLink', { word: word[locale] })"
            decoding="async"
            class="results__permalink--copy"
            @click="copyLink(word.id, $event)"
          />
          <img
            src="~/assets/vendor/octicons/check.svg"
            width="12"
            height="12"
            :alt="t('copyLinkDone', { word: word[locale] })"
            decoding="async"
            class="results__permalink--copied"
            style="display: none;"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<i18n>
{
  "en": {
    "example": "Example",
    "permalink": "Permalink",
    "permalinkAlt": "Link to {word}",
    "copyLink": "Copy link to {word}",
    "copyLinkDone": "Copied link to {word}"
  },
  "ja": {
    "example": "例文",
    "permalink": "固定リンク",
    "permalinkAlt": "{word}のページへのリンク",
    "copyLink": "{word}のページへのリンクをコピー",
    "copyLinkDone": "{word}のページへのリンクのコピーが完了しました"
  },
  "zh-CN": {
    "example": "示例",
    "permalink": "永久链接",
    "permalinkAlt": "{word}的链接",
    "copyLink": "复制{word}的链接",
    "copyLinkDone": "已复制{word}的链接"
  }
}
</i18n>

<script setup>
import { useDictionaryStore } from "~/store/index.js";
import { sleep } from "~/libs/utils.js";

const props = defineProps({
  words: {
    type: Array,
    required: true,
  },
});

const { $pinia } = useNuxtApp();
const { locale, t } = useI18n();

const store = useDictionaryStore($pinia);

//
// refs
//
const wordList = ref(null);

//
// methods
//
const observer = process.client ? new IntersectionObserver((entries, observer) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) {
      return;
    }

    observer.unobserve(entry.target);
    store.loadMore();
  }
}) : null;

const addIntersectionObserver = () => {
  const wordEls = wordList.value;

  if (0 < wordEls.length) {
    observer.observe(wordEls[wordEls.length - 1]); // add observer to the last word element
  }
};

//
// Lifecycle Hooks
//
onMounted(() => {
  addIntersectionObserver();
});

onUpdated(async () => {
  await nextTick();
  addIntersectionObserver();
});

//
// event handlers
//
const localePath = useLocalePath();
const copyLink = async (wordId, $event) => {
  navigator.clipboard.writeText(`https://genshin-dictionary.com/${locale.value}/${wordId}`);

  const copyImg = $event.target;
  const copiedImg = copyImg.parentElement.getElementsByClassName("results__permalink--copied")[0];
  copyImg.style.display = "none";
  copiedImg.style.display = "inline";

  await sleep(1000);

  copiedImg.style.display = "none";
  copyImg.style.display = "inline";
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

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
  width: 100%;

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
