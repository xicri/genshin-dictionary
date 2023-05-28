import type { BuiltWord, Locale, SearchConditions } from "@/types";

import _allWords from "../../public/dataset/words.json";
const allWords = _allWords as BuiltWord[];

class CandidateString {
  constructor(private candidate: string|undefined) {}

  private normalize(str: string): string {
    return str
      // replace Katakana with Hiragana
      .replace(/[ァ-ヴ]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0x60))
      // ignore symbols
      // e.g. search query: "勤労の導き" -> result: "「勤労」の導き"
      // e.g. search query: "氷元素" -> result: "氷 (元素)"
      // e.g. search query: "ジングンヒルド" -> result: "ジン・グンヒルド"
      .replace(/[（）()「」『』<>＜＞《》'"、。,.，．・!?！？ 　]/g, "")
      .replace(/ゔぁ/g, "ば")
      .replace(/ゔぃ/g, "び")
      .replace(/ゔぇ/g, "べ")
      .replace(/ゔぉ/g, "ぼ")
      .replace(/ゔ/g, "ぶ") // You need to replace after ゔぇ & ゔぉ, or ゔぇ & ゔぉ would be converted to ぶぇ & ぶぉ.
      .toLowerCase();
  }

  equals(searchElement: string): boolean {
    if (!this.candidate) {
      return false;
    }

    return this.normalize(this.candidate) === this.normalize(searchElement);
  }

  includes(searchElement: string): boolean {
    if (!this.candidate) {
      return false;
    }

    const candidate = this.normalize(this.candidate);
    const _searchElement = this.normalize(searchElement);
    return candidate.includes(_searchElement);
  }
}

const candidate = (str: string|undefined): CandidateString => new CandidateString(str);

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
 * @param {string} options.currentLocale - Current locale
 * @returns {GetWordsReturn} words:  words as the search result, length: length of the search result when maxWords == ∞
 */
export const getWords = ({
  wordID = "",
  query = "",
  activeTags = [],
  maxWords = 100,
  sortBy,
  currentLocale,
}: SearchConditions & { currentLocale?: Locale }): GetWordsReturn => {
  if (wordID) {
    const word: BuiltWord | undefined = allWords.find(word => word.id === wordID);
    return word ? { words: [ word ], fullLength: 1 } : { words: [], fullLength: 0 };
  } else {
    let words;

    if (query) {
      const wordsExactMatch = [];
      const wordsExactMatchWithVariants = [];
      const wordsPartialMatch = [];
      const wordsPartialMatchWithVariants = [];
      const wordsPartialMatchWithPronunciationJa = [];
      const wordsMatchWithNotes = [];

      for (const word of allWords) {
        if ( // 1. exact match with en, ja, and zhCN, and pronunciationJa
          candidate(word.ja).equals(query) ||
          candidate(word.en).equals(query) ||
          candidate(word.zhCN).equals(query) ||
          candidate(word.pronunciationJa).equals(query)
        ) {
          wordsExactMatch.push(word);
        } else if ( // 2. exact match with variants.en, variants.ja, and variants.zhCN
          (word.variants?.ja?.some(variant => candidate(variant).equals(query)) ?? false) ||
          (word.variants?.en?.some(variant => candidate(variant).equals(query)) ?? false) ||
          (word.variants?.zhCN?.some(variant => candidate(variant).equals(query)) ?? false)
        ) {
          wordsExactMatchWithVariants.push(word);
        } else if ( // 3. forward/backword/partial match with en, ja, and zhCN
          candidate(word.ja).includes(query) ||
          candidate(word.en).includes(query) ||
          candidate(word.zhCN).includes(query)
        ) {
          wordsPartialMatch.push(word);
        } else if ( // 4. forward/backword/partial match with variants.en, variants.ja, and variants.zhCN
          (word.variants?.ja?.some(variant => candidate(variant).includes(query)) ?? false) ||
          (word.variants?.en?.some(variant => candidate(variant).includes(query)) ?? false) ||
          (word.variants?.zhCN?.some(variant => candidate(variant).includes(query)) ?? false)
        ) {
          wordsPartialMatchWithVariants.push(word);
        } else if ( // 5. forward/backword/partial match with pronunciationJa
          candidate(word.pronunciationJa).includes(query)
        ) {
          wordsPartialMatchWithPronunciationJa.push(word);
        } else if ( // 6-1. exact/forward/backword/partial match with notes (on Japanese UI only)
          currentLocale === "ja" &&
          candidate(word.notes).includes(query)
        ) {
          wordsMatchWithNotes.push(word);
        } else if ( // 6-2. exact/forward/backword/partial match with notesZh (on Chinese UI only)
          currentLocale === "zh-CN" &&
          candidate(word.notesZh).includes(query)
        ) {
          wordsMatchWithNotes.push(word);
        } else if ( // 6-3. exact/forward/backword/partial match with ntoes and notesZh
          !currentLocale &&
          (
            candidate(word.notes).includes(query) ||
            candidate(word.notesZh).includes(query)
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
      words = allWords;
    }

    words = words.filter(word => {
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
