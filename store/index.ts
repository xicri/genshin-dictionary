import { defineStore } from "pinia";
import allWords from "~/dataset/words.json";
import { candidate } from "../utils/utils.ts";
import type { Locale, TagID, Word } from "../types.ts";

export const useDictionaryStore = defineStore("dictionary", {
  state: () => ({
    wordID: "" as string,
    query: "" as string,
    tags: [] as TagID[],
    maxWords: 100 as number,
    currentLocale: undefined as Locale | undefined,
  }),

  getters: {
    searchResults: (state): Word[] => {
      if (state.wordID) {
        const word = (allWords as Word[]).find((word) => word.id === state.wordID);
        return word ? [ word ] : [];
      } else {
        let words: Word[];

        if (state.query) {
          const wordsExactMatch = [];
          const wordsExactMatchWithVariants = [];
          const wordsPartialMatch = [];
          const wordsPartialMatchWithVariants = [];
          const wordsPartialMatchWithPronunciationJa = [];
          const wordsMatchWithNotes = [];

          for (const word of allWords as Word[]) {
            if ( // 1. exact match with en, ja, zhCN, and zhTW, and pronunciationJa
              candidate(word.ja).equals(state.query)
              || candidate(word.en).equals(state.query)
              || candidate(word.zhCN).equals(state.query)
              || candidate(word.zhTW).equals(state.query)
              || candidate(word.pronunciationJa).equals(state.query)
            ) {
              wordsExactMatch.push(word);
            } else if ( // 2. exact match with variants.en, variants.ja, variants.zhCN, and variants.zhTW
              (word.variants?.ja?.some((variant) => candidate(variant).equals(state.query)) ?? false)
              || (word.variants?.en?.some((variant) => candidate(variant).equals(state.query)) ?? false)
              || (word.variants?.zhCN?.some((variant) => candidate(variant).equals(state.query)) ?? false)
              || (word.variants?.zhTW?.some((variant) => candidate(variant).equals(state.query)) ?? false)
            ) {
              wordsExactMatchWithVariants.push(word);
            } else if ( // 3. forward/backword/partial match with en, ja, zhCN, and zhTW
              candidate(word.ja).includes(state.query)
              || candidate(word.en).includes(state.query)
              || candidate(word.zhCN).includes(state.query)
              || candidate(word.zhTW).includes(state.query)
            ) {
              wordsPartialMatch.push(word);
            } else if ( // 4. forward/backword/partial match with variants.en, variants.ja, variants.zhCN, and variants.zhTW
              (word.variants?.ja?.some((variant) => candidate(variant).includes(state.query)) ?? false)
              || (word.variants?.en?.some((variant) => candidate(variant).includes(state.query)) ?? false)
              || (word.variants?.zhCN?.some((variant) => candidate(variant).includes(state.query)) ?? false)
              || (word.variants?.zhTW?.some((variant) => candidate(variant).includes(state.query)) ?? false)
            ) {
              wordsPartialMatchWithVariants.push(word);
            } else if ( // 5. forward/backword/partial match with pronunciationJa
              candidate(word.pronunciationJa).includes(state.query)
            ) {
              wordsPartialMatchWithPronunciationJa.push(word);
            } else if ( // 6-1. exact/forward/backword/partial match with notes (on Japanese UI only)
              state.currentLocale === "ja"
              && candidate(word.notes).includes(state.query)
            ) {
              wordsMatchWithNotes.push(word);
            } else if ( // 6-2. exact/forward/backword/partial match with notesZh (on Chinese UI only)
              (state.currentLocale === "zh-CN" || state.currentLocale === "zh-TW")
              && candidate(word.notesZh).includes(state.query)
            ) {
              wordsMatchWithNotes.push(word);
            } else if ( // 6-3. exact/forward/backword/partial match with ntoes and notesZh
              !state.currentLocale
              && (
                candidate(word.notes).includes(state.query)
                || candidate(word.notesZh).includes(state.query)
              )
            ) {
              wordsMatchWithNotes.push(word);
            }
          }

          words = [
            ...wordsExactMatch,
            ...wordsExactMatchWithVariants,
            ...wordsPartialMatch,
            ...wordsPartialMatchWithVariants,
            ...wordsPartialMatchWithPronunciationJa,
            ...wordsMatchWithNotes,
          ];
        } else {
          words = allWords as Word[];
        }

        return words.filter((word) => {
          // If no search tag(s) are specified, do not filter
          if (state.tags.length <= 0) {
            return true;
          }

          // If no tags specified in the word, it should not be included in the result
          if (!Array.isArray(word.tags) || word.tags.length <= 0) {
            return false;
          }

          // true every search tag is included in the word tags
          return state.tags.every((searchTag) => word.tags?.includes(searchTag));
        }).slice(0, state.maxWords);
      }
    },
  },

  actions: {
    setLocale(locale: Locale) {
      this.currentLocale = locale;
    },
    queryByID(id: string) {
      this.wordID = id;

      this.maxWords = 100;
    },
    updateSearchQuery(query: string) {
      this.wordID = "";
      this.query = query;

      this.maxWords = 100;
    },
    addTags(tags: TagID | TagID[]) {
      this.wordID = "";

      if (Array.isArray(tags)) {
        this.tags = this.tags.concat(tags);
      } else {
        this.tags.push(tags);
      }

      this.maxWords = 100;
    },
    removeTag(tagIndex: number) {
      this.wordID = "";
      this.tags.splice(tagIndex, 1);

      this.maxWords = 100;
    },
    loadMore() {
      this.maxWords += 100;
    },
  },
});
