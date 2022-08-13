import { defineStore } from "pinia";
import { candidate } from "../libs/utils.js";
import words from "~/static/dataset/words.json";

export const useDictionaryStore = defineStore("dictionary", {
  state: () => ({
    wordID: "",
    query: "",
    tags: [],
    maxWords: 100,
  }),

  getters: {
    searchResults: (state) => {
      if (state.wordID) {
        const word = words.find(word => word.id === state.wordID);
        return word ? [ word ] : [];
      } else {
        const results = words.filter(word => {
          if (state.query) {
            return (
              candidate(word.ja).includes(state.query) ||
              candidate(word.en).includes(state.query) ||
              candidate(word.zhCN).includes(state.query) ||
              candidate(word.pronunciationJa).includes(state.query) ||
              candidate(word.notes).includes(state.query) ||
              word.variants?.ja?.some(variant => candidate(variant).includes(state.query)) ||
              word.variants?.en?.some(variant => candidate(variant).includes(state.query))
            );
          } else { // If no search terms are specified, do not filter.
            return true;
          }
        }).filter(word => {
          // If no search tag(s) are specified, do not filter
          if (state.tags.length <= 0) {
            return true;
          }

          // If no tags specified in the word, it should not be included in the result
          if (!Array.isArray(word.tags) || word.tags.length <= 0) {
            return false;
          }

          // true every search tag is included in the word tags
          return state.tags.every(searchTag => word.tags.includes(searchTag));
        });

        return results.slice(0, state.maxWords);
      }
    },
  },

  actions: {
    queryByID(id) {
      this.wordID = id;

      this.maxWords = 100;
    },
    updateSearchQuery(query) {
      this.wordID = "";
      this.query = query;

      this.maxWords = 100;
    },
    addTags(tags) {
      this.wordID = "";

      if (Array.isArray(tags)) {
        this.tags = this.tags.concat(tags);
      } else {
        this.tags.push(tags);
      }

      this.maxWords = 100;
    },
    removeTag(tagIndex) {
      this.wordID = "";
      this.tags.splice(tagIndex, 1);

      this.maxWords = 100;
    },
    loadMore() {
      this.maxWords += 100;
    },
  },
});
