import { DateTime } from "luxon";
import allWords from "../../public/dataset/words.json";
import type { BuiltWord, History } from "@/types";

class CandidateString {
  constructor(private candidate: string|undefined) {}

  includes(searchElement: string): boolean {
    const normalize = (str: string): string => str
      // replace Katakana with Hiragana
      .replace(/[ァ-ヴ]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0x60))
      // ignore symbols
      // e.g. search query: "勤労の導き" -> result: "「勤労」の導き"
      // e.g. search query: "氷元素" -> result: "氷 (元素)"
      // e.g. search query: "ジングンヒルド" -> result: "ジン・グンヒルド"
      .replace(/[（）()「」・ ]/g, "")
      .replace(/ゔぁ/g, "ば")
      .replace(/ゔぃ/g, "び")
      .replace(/ゔぇ/g, "べ")
      .replace(/ゔぉ/g, "ぼ")
      .replace(/ゔ/g, "ぶ") // You need to replace after ゔぇ & ゔぉ, or ゔぇ & ゔぉ would be converted to ぶぇ & ぶぉ.
      .toLowerCase();

    if (!this.candidate) {
      return false;
    }

    const candidate = normalize(this.candidate);
    const _searchElement = normalize(searchElement);
    return candidate.includes(_searchElement);
  }
}

export const candidate = (str: string|undefined): CandidateString => new CandidateString(str);

export const getHistory = (): History => {
  function reverseSortObject<T extends { [key: string]: unknown }>(obj: T): T {
    const newObj: { [key: string]: unknown } = {};

    for (const key of Object.keys(obj).sort().reverse()) {
      newObj[key] = obj[key];
    }

    return <T>newObj;
  }

  const history: History = {};

  for (const word of allWords as BuiltWord[]) {
    const createdAt = DateTime.fromISO(word.createdAt);
    const threeMonthsAgo = DateTime.now().minus({ months: 3 });
    const createdAtJa = createdAt.toFormat("yyyy/MM/dd");

    // Ignore words updated before one month ago
    if (createdAt < threeMonthsAgo) {
      continue;
    }

    if (!Array.isArray(history[createdAtJa])) {
      history[createdAtJa] = [];
    }
    history[createdAtJa].push(word);
  }

  // If 300+ words are updated at once, that would be considered resetting createdAt
  // and not be shown in the history.
  for (const [ createdAt, updatedWords ] of Object.entries(history)) {
    if (300 < updatedWords.length) {
      delete history[createdAt];
    }
  }

  return reverseSortObject(history);
};

export const sleep = async (ms: number): Promise<void> =>
  new Promise(resolve =>
    setTimeout(() => resolve(), ms)
  );

export const escapeHtmlString = (html: string): string => {
  type mapType = {
    [key: string]: string,
  };
  const map: mapType = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return html.replace(/[&<>]/g, (charToEscape) => map[charToEscape] ?? charToEscape);
};
