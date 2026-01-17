import allWords from "../../dataset/words.json";
import { candidate } from "$lib/utils.ts";
import type { Locale, TagID, Word } from "$lib/types.ts";

export const getWordFromID = (wordID: string) =>
  allWords.find((word) => word.id === wordID);

type SearchWordsOptions = {
  query?: string;
  queryTagSlugs?: TagID[];
  maxWords?: number;
  locale: Locale;
};

export const searchWords = ({
  query,
  queryTagSlugs = [],
  maxWords = 100,
  locale,
}: SearchWordsOptions): Word[] => {
  let words: Word[];

  if (query) {
    const wordsExactMatch = [];
    const wordsExactMatchWithVariants = [];
    const wordsPartialMatch = [];
    const wordsPartialMatchWithVariants = [];
    const wordsPartialMatchWithPronunciationJa = [];
    const wordsMatchWithNotes = [];

    for (const word of allWords as Word[]) {
      if ( // 1. exact match with en, ja, zhCN, and zhTW, and pronunciationJa
        candidate(word.ja).equals(query)
        || candidate(word.en).equals(query)
        || candidate(word.zhCN).equals(query)
        || candidate(word.zhTW).equals(query)
        || candidate(word.pronunciationJa).equals(query)
      ) {
        wordsExactMatch.push(word);
      } else if ( // 2. exact match with variants.en, variants.ja, variants.zhCN, and variants.zhTW
        (word.variants?.ja?.some((variant) => candidate(variant).equals(query)) ?? false)
        || (word.variants?.en?.some((variant) => candidate(variant).equals(query)) ?? false)
        || (word.variants?.zhCN?.some((variant) => candidate(variant).equals(query)) ?? false)
        || (word.variants?.zhTW?.some((variant) => candidate(variant).equals(query)) ?? false)
      ) {
        wordsExactMatchWithVariants.push(word);
      } else if ( // 3. forward/backword/partial match with en, ja, zhCN, and zhTW
        candidate(word.ja).includes(query)
        || candidate(word.en).includes(query)
        || candidate(word.zhCN).includes(query)
        || candidate(word.zhTW).includes(query)
      ) {
        wordsPartialMatch.push(word);
      } else if ( // 4. forward/backword/partial match with variants.en, variants.ja, variants.zhCN, and variants.zhTW
        (word.variants?.ja?.some((variant) => candidate(variant).includes(query)) ?? false)
        || (word.variants?.en?.some((variant) => candidate(variant).includes(query)) ?? false)
        || (word.variants?.zhCN?.some((variant) => candidate(variant).includes(query)) ?? false)
        || (word.variants?.zhTW?.some((variant) => candidate(variant).includes(query)) ?? false)
      ) {
        wordsPartialMatchWithVariants.push(word);
      } else if ( // 5. forward/backword/partial match with pronunciationJa
        candidate(word.pronunciationJa).includes(query)
      ) {
        wordsPartialMatchWithPronunciationJa.push(word);
      } else if ( // 6-1. exact/forward/backword/partial match with notes (on Japanese UI only)
        locale === "ja"
        && candidate(word.notes).includes(query)
      ) {
        wordsMatchWithNotes.push(word);
      } else if ( // 6-2. exact/forward/backword/partial match with notesZh (on Chinese UI only)
        locale === "en"
        && candidate(word.notesEn).includes(query)
      ) {
        wordsMatchWithNotes.push(word);
      } else if ( // 6-3. exact/forward/backword/partial match with notesZh (on Chinese UI only)
        locale === "zh-CN"
        && candidate(word.notesZh).includes(query)
      ) {
        wordsMatchWithNotes.push(word);
      } else if ( // 6-4. exact/forward/backword/partial match with notesZh (on Chinese UI only)
        locale === "zh-TW"
        && candidate(word.notesZhTW).includes(query)
      ) {
        wordsMatchWithNotes.push(word);
      } else if ( // 6-5. exact/forward/backword/partial match with ntoes and notesZh
        !locale
        && (
          candidate(word.notes).includes(query)
          || candidate(word.notesZh).includes(query)
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
    if (queryTagSlugs.length <= 0) {
      return true;
    }

    // If no tags specified in the word, it should not be included in the result
    if (!Array.isArray(word.tags) || word.tags.length <= 0) {
      return false;
    }

    // true every search tag is included in the word tags
    return queryTagSlugs.every((searchTag) => word.tags?.includes(searchTag));
  }).slice(0, maxWords);
};
