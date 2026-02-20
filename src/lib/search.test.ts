import { expect, test } from "vitest";
import { searchWords } from "./search.ts";

test("search by pronunciationJa", () => {
  const words = searchWords({
    query: "いなずま",
    locale: "ja",
  });

  expect(words[0].ja).toBe("稲妻");
});

test("search words including 'ヴァヴィヴヴェヴォ' by 'ばびぶべぼ'", () => {
  const results = searchWords({
    query: "ベル・ゴレット",
    locale: "ja",
  });
  expect(results).toHaveLength(1);
  expect(results[0].ja).toBe("ヴェル・ゴレット");
});

type Fixture = {
  result: string;
  input: string;
  locale: "en" | "ja" | "zh-CN" | "zh-TW";
  lang: "en" | "ja" | "zhCN" | "zhTW";
};

const fixtures: Fixture[] = [
  {
    result: "Geo Archon",
    input: "Geo God",
    locale: "en",
    lang: "en",
  },
  {
    result: "神里綾華",
    input: "神里綾香",
    locale: "ja",
    lang: "ja",
  },
  {
    result: "神里绫华",
    input: "神里凌华",
    locale: "zh-CN",
    lang: "zhCN",
  },
  {
    result: "神里綾華",
    input: "神里凌華",
    locale: "zh-TW",
    lang: "zhTW",
  },
];

for (const { result, input, locale, lang } of fixtures) {
  test(`search by variants (${ lang })`, () => {
    const results = searchWords({
      query: input,
      locale,
    });
    expect(results).toHaveLength(1);
    expect(results[0][lang]).toBe(result);
  });
}

test("search order", () => {
  const words = searchWords({
    query: "稲妻",
    locale: "ja",
  });

  expect(words[0].ja).toBe("稲妻");

  const partialMatchIndex = words.findIndex((word) => word.ja?.includes("稲妻"));
  const partialMatchNotesIndex = words.findIndex((word) => word.notes?.includes("稲妻"));

  expect(partialMatchIndex).toBeLessThan(partialMatchNotesIndex);
});

test("show all words if search query is empty", () => {
  const words = searchWords({
    query: "",
    locale: "ja",
  });

  expect(words.length).toBe(100);
});
