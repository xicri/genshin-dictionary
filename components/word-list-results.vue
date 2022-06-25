<template>
  <main class="results">
    <div v-for="word in words" :key="word.en" ref="wordList" class="results__word">
      <h4 class="results__translations">
        <div v-if="word.ja" class="results__translation">
          <span class="results__langname results__translation-item">日本語: </span>
          <div class="results__translation-item">
            <div class="results__ja">
              <span data-e2e="ja">{{ word.ja }}</span>
              <span v-if="word.pronunciationJa" class="results__pronunciation-ja">({{ word.pronunciationJa }})</span>
            </div>
          </div>
        </div>

        <div class="results__translation">
          <span class="results__langname results__translation-item">English: </span>
          <span class="results__translation-item">{{ word.en }}</span>
        </div>

        <div v-if="word.zhCN" class="results__translation">
          <span class="results__langname results__translation-item">简体中文: </span>
          <span class="results__translation-item">{{ word.zhCN }}</span>
        </div>
      </h4>
      <div class="results__description">
        <div class="results__tags results__description-section">
          <a v-for="tag in word.tags" :key="tag" :href="`/tags/${tag}/`">
            <tag :tagid="tag" />
          </a>
        </div>
        <div v-if="word.notes" class="results__description-section" data-e2e="notes" v-html="word.notes"></div>
        <div v-if="word.examples && 0 < word.examples.length" class="results__description-section">
          <h5 class="linebreak">
            例文
          </h5>
          <div v-for="example in word.examples" :key="example.en" class="results__description-section-level2">
            <p>&quot;{{ example.en }}&quot;</p>
            <p>「{{ example.ja }}」</p>
            <template v-if="example.ref">
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
          <a :href="`/${word.id}/`">
            <!--
              Approximate values of width & height are specified in HTML to mitigate Comulative Layout Shift,
              but actual values are specified in SCSS.
            -->
            <img
              src="~/assets/vendor/octicons/link.svg"
              width="12"
              height="12"
              :alt="`${word.ja}のページへのリンク`"
              decoding="async"
              class="results__permalink--icon"
            > 固定リンク
          </a>
          <img
            src="~/assets/vendor/octicons/copy.svg"
            width="12"
            height="12"
            :alt="`${word.ja}のページへのリンクをコピー`"
            decoding="async"
            class="results__permalink--copy"
            @click="copyLink(word.id, $event)"
          >
          <img
            src="~/assets/vendor/octicons/check.svg"
            width="12"
            height="12"
            :alt="`${word.ja}のページへのリンクのコピーが完了しました`"
            decoding="async"
            class="results__permalink--copied"
            style="display: none;"
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent, nextTick, onMounted, onUpdated, ref, useContext } from "@nuxtjs/composition-api";
import { useDictionaryStore } from "~/store/index.js";
import { sleep } from "~/libs/utils.js";

export default defineComponent({
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { $pinia } = useContext();
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

    return {
      // refs
      wordList,
      // event handlers
      async copyLink(wordId, $event) {
        navigator.clipboard.writeText(`https://genshin-dictionary.com/${wordId}/`);

        const copyImg = $event.target;
        const copiedImg = copyImg.parentElement.getElementsByClassName("results__permalink--copied")[0];
        copyImg.style.display = "none";
        copiedImg.style.display = "inline";

        await sleep(1000);

        copiedImg.style.display = "none";
        copyImg.style.display = "inline";
      },
    };
  },
});
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

    border-bottom: 1px solid vars.$color-light;

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

  &__permalink--icon {
    width: 1em;
    height: 1em;
  }
}

</style>
