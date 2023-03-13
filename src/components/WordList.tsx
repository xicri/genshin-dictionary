import { useState } from "react";
import { WordListSearch } from "@/components/WordListSearch";
import { WordListResults } from "@/components/WordListResults";
import type allTags from "../../public/dataset/tags.json";
import type { Locale, OnSearchProps, TagID } from "@/types";

type Props = {
  locale: Locale,
  onSearch?: () => void,
};

export function WordList({ locale, onSearch: emitSearch }: Props): JSX.Element {
  const [ wordID, setWordID ] = useState("");
  const [ query, setQuery ] = useState("");
  const [ activeTags, setActiveTags ] = useState<TagID[]>([]);
  const [ maxWords, setMaxWords ] = useState(100);

  //
  // Event handlers
  //
  const onSearch = ({ query: newQuery, newTag, removeTagIndex, maxWords: newMaxWords }: OnSearchProps): void => {
    if (typeof newQuery === "string") {
      setMaxWords(100);
      setWordID("");

      setQuery(newQuery);
    }

    if (newTag) {
      setMaxWords(100);
      setWordID("");

      setActiveTags([ ...activeTags, newTag ]);
    }

    if (typeof removeTagIndex === "number" && 0 <= removeTagIndex) {
      setMaxWords(100);
      setWordID("");

      setActiveTags(activeTags.filter((_, i) => i !== removeTagIndex));
    }

    if (newMaxWords === "reset") {
      setMaxWords(100);
    } else if (typeof newMaxWords === "number" && 100 <= newMaxWords) {
      setMaxWords(newMaxWords);
    } else if (typeof newMaxWords === "undefined") {
      // Do nothing
    } else {
      throw new TypeError(`maxWords has to be more than 100. Given number: ${newMaxWords}`);
    }

    if (emitSearch) {
      emitSearch();
    }
  };

  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

        .word-list {
          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;

          &__wrapper {
            max-width: vars.$max-width;
            width: 100%;
          }

          &__search {
            padding-top: 1em;
            padding-bottom: 1.2em;

            // avoid overwrapping search bar by Google AdSense
            z-index: 1;
          }
        }

        @media (max-width: vars.$max-width) { // Mobile
          .word-list {
            // Avoid overwrap when the user scrolled at the bottom of the page
            margin-bottom: 11em;

            &__wrapper {
              margin-bottom: 4em;
            }

            // Show search component at the bottom of the page on mobile devices
            &__search {
              position: fixed;
              bottom: 0;
              width: 100%;
              padding-left: vars.$side-margin;
              padding-right: vars.$side-margin;
              background-color: vars.$color-lightest;
              box-shadow: 0 -0.2rem 5px #00000030;
            }

            &__results {
              padding-left: vars.$side-margin;
              padding-right: vars.$side-margin;
            }
          }
        }
      `}</style>

      <div className="word-list">
        <div className="word-list__wrapper">
          <WordListSearch className="word-list__search" locale={locale} searchConditions={{ wordID, query, activeTags, maxWords }} onSearch={onSearch} />
          <WordListResults className="word-list__results" searchConditions={{ wordID, query, activeTags, maxWords }} onLoadMoreWords={() => setMaxWords(maxWords + 100)} locale={locale} />
        </div>
      </div>
    </>
  );
}
