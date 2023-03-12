import { candidate } from "@/libs/utils";
import type { BuiltWord, SearchConditions } from "@/types";

import _allWords from "../../public/dataset/words.json";
const allWords = _allWords as BuiltWord[];

export const getWords = ({ wordID = "", query = "", activeTags = [], maxWords = 100, sortBy }: SearchConditions): BuiltWord[] => {
  if (wordID) {
    const word: BuiltWord | undefined = allWords.find(word => word.id === wordID);
    return word ? [ word ] : [];
  } else {
    const words = allWords.filter(word => {
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

    return words.slice(0, maxWords);
  }
};
