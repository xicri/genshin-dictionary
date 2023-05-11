import { candidate } from "@/libs/utils";
import type { BuiltWord, SearchConditions } from "@/types";

import _allWords from "../../public/dataset/words.json";
const allWords = _allWords as BuiltWord[];

type GetWordsReturn = {
  words: BuiltWord[],
  fullLength: number,
};

/**
 * Search words by given conditions.
 * @param {object} options - options
 * @param {string} options.wordID - ID of the word. Useful when you want to show single word.
 * @param {string} options.query - search query
 * @param {string[]} options.activeTags - search tags
 * @param {number} options.maxWords - max word number. Default is 100.
 * @param {string} options.sortBy - If you specify "createdAt", it is reverse-sorted by the created date
 * @returns {GetWordsReturn} words:  words as the search result, length: length of the search result when maxWords == ∞
 */
export const getWords = ({ wordID = "", query = "", activeTags = [], maxWords = 100, sortBy }: SearchConditions): GetWordsReturn => {
  if (wordID) {
    const word: BuiltWord | undefined = allWords.find(word => word.id === wordID);
    return word ? { words: [ word ], fullLength: 1 } : { words: [], fullLength: 0 };
  } else {
    let words = allWords.filter(word => {
      // If no search query is specified, do not filter
      if (!query) {
        return true;
      }

      return (
        candidate(word.ja).includes(query) ||
        candidate(word.en).includes(query) ||
        candidate(word.zhCN).includes(query) ||
        candidate(word.pronunciationJa).includes(query) ||
        candidate(word.notes).includes(query) ||
        (word.variants?.ja?.some(variant => candidate(variant).includes(query)) ?? false) ||
        (word.variants?.en?.some(variant => candidate(variant).includes(query)) ?? false) ||
        (word.variants?.zhCN?.some(variant => candidate(variant).includes(query)) ?? false)
      );
    }).filter(word => {
      // If no search tag(s) are specified, do not filter
      if (activeTags.length <= 0) {
        return true;
      }

      // If no tags specified in the word, it should not be included in the result
      if (!word.tags || !Array.isArray(word.tags) || word.tags.length <= 0) {
        return false;
      }

      // true every search tag is included in the word tags
      return activeTags.every(searchTag => word.tags?.includes(searchTag));
    });

    if (sortBy) {
      words.sort((wordA, wordB) => wordB[sortBy] < wordA[sortBy] ? -1 : 1);
    }

    const fullLength = words.length;
    words = words.slice(0, maxWords);

    return {
      words,
      fullLength,
    };
  }
};
