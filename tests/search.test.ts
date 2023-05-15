import { getWords } from "@/libs/words";


test("search words including 'ヴァヴィヴヴェヴォ' by 'ばびぶべぼ'", () => {
  const { words } = getWords({ query: "ベル・ゴレット" });
  expect(words).toHaveLength(1);
  expect(words[0].ja).toBe("ヴェル・ゴレット");
});

type Fixture = {
  result: string,
  input: string,
  lang: "en"|"ja"|"zhCN",
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
    const { words } = getWords({ query: input });
    expect(words).toHaveLength(1);
    expect(words[0][lang]).toBe(result);
  });
}
