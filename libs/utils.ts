import { DateTime } from "luxon";

import allWords from "~/dataset/words.json";
import type { Word } from "../types";

class CandidateString {
  #candidate: string | undefined;

  constructor(candidate: string | undefined) {
    this.#candidate = candidate;
  }

  #normalize(str: string): string {
    return str
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
  }

  equals(searchElement: string): boolean {
    if (!this.#candidate) {
      return false;
    }

    return this.#normalize(this.#candidate) === this.#normalize(searchElement);
  }

  includes(searchElement: string): boolean {
    if (!this.#candidate) {
      return false;
    }

    const candidate = this.#normalize(this.#candidate);
    const _searchElement = this.#normalize(searchElement);
    return candidate.includes(_searchElement);
  }
}

export const candidate = (str: string | undefined): CandidateString => new CandidateString(str);

type History = { [key:string]: Word[]};

export const getHistory = (): History => {
  function reverseSortObject<T extends { [key: string]: unknown }>(obj: T): T {
    const newObj: { [key:string]: unknown } = {};

    for (const key of Object.keys(obj).sort().reverse()) {
      newObj[key] = obj[key];
    }

    return newObj as T;
  }

  const history: History = {};

  for (const word of allWords) {
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
    history[createdAtJa].push(word as Word);
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
    setTimeout(() => resolve(undefined), ms)
  );

export const escapeHtmlString = (html: string): string => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return html.replace(/[&<>]/g, (charToEscape) => {
    if (
      charToEscape === "&" ||
      charToEscape === "<" ||
      charToEscape === ">"
    ) {
      return map[charToEscape];
    } else {
      return charToEscape;
    }
  });
};
