import { DateTime } from "luxon";

import allWords from "../dataset/words.json";
import type { Word } from "../types";

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
