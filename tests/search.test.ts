import { setActivePinia, createPinia } from "pinia";
import { beforeEach, expect, test } from "vitest";
import { useDictionaryStore } from "~/store/index.ts";
import type { Word } from "../types.ts";

function search(query: string): Word[] {
  const store = useDictionaryStore();
  store.updateSearchQuery(query);

  return store.searchResults;
}

beforeEach(() => {
  setActivePinia(createPinia());
});

test("search by pronunciationJa", () => {
  const words = search("いなずま");

  expect(words[0].ja).toBe("稲妻");
});

test("search words including 'ヴァヴィヴヴェヴォ' by 'ばびぶべぼ'", () => {
  const results = search("ベル・ゴレット");
  expect(results).toHaveLength(1);
  expect(results[0].ja).toBe("ヴェル・ゴレット");
});

type Fixture = {
  result: string;
  input: string;
  lang: "en" | "ja" | "zhCN";
};

const fixtures: Fixture[] = [
  {
    result: "Geo Archon",
    input: "Geo God",
    lang: "en",
  },
  {
    result: "神里綾華",
    input: "神里綾香",
    lang: "ja",
  },
  {
    result: "神里绫华",
    input: "神里凌华",
    lang: "zhCN",
  },
];

for (const { result, input, lang } of fixtures) {
  test(`search by variants (${lang})`, () => {
    const results = search(input);
    expect(results).toHaveLength(1);
    expect(results[0][lang]).toBe(result);
  });
}

test("search order", () => {
  const words = search("稲妻");

  expect(words[0].ja).toBe("稲妻");

  const partialMatchIndex = words.findIndex(word => word.ja?.includes("稲妻"));
  const partialMatchNotesIndex = words.findIndex(word => word.notes?.includes("稲妻"));

  expect(partialMatchIndex).toBeLessThan(partialMatchNotesIndex);
});
