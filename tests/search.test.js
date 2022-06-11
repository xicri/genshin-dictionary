import { setActivePinia, createPinia } from "pinia";
import { useDictionaryStore } from "~/store/index.js";

function search(query) {
  const store = useDictionaryStore();
  store.updateSearchQuery(query);

  return store.searchResults;
}

beforeEach(() => {
  setActivePinia(createPinia());
});

test("search words including 'ヴァヴィヴヴェヴォ' by 'ばびぶべぼ'", () => {
  const results = search("ベル・ゴレット");
  expect(results).toHaveLength(1);
  expect(results[0].ja).toBe("ヴェル・ゴレット");
});
