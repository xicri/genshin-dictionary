import { useCallback, useEffect, useState } from "react";
import { WordListSearch } from "@/components/WordListSearch";
import { WordListResults } from "@/components/WordListResults";
import type allTags from "../../public/dataset/tags.json";
import type { Locale, OnSearchProps, TagID } from "@/types";

type Props = {
  locale: Locale,
  wordID?: string,
  onSearch?: () => void,
};

export function WordList({ locale, wordID: defaultWordID = "", onSearch: emitSearch }: Props): JSX.Element {
  const [ wordID, setWordID ] = useState(defaultWordID);
  const [ query, setQuery ] = useState("");
  const [ activeTags, setActiveTags ] = useState<TagID[]>([]);
  const [ maxWords, setMaxWords ] = useState(100);

  const reset = useCallback((): void => {
    setWordID(defaultWordID);
    setQuery("");
    setActiveTags([]);
    setMaxWords(100);
  }, [ defaultWordID ]);

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

  useEffect(() => {
    // Reset on browser back
    window.onpopstate = () => {
      reset();
    };
  }, [ reset ]);

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
        }

        @media (max-width: vars.$max-width) { // Mobile
          .word-list {
            // Avoid overwrap when the user scrolled at the bottom of the page
            margin-bottom: 11em;

            &__wrapper {
              margin-bottom: 4em;
            }
          }
        }
      `}</style>

      <div className="word-list">
        <div className="word-list__wrapper">
          <WordListSearch locale={locale} searchConditions={{ wordID, query, activeTags, maxWords }} onSearch={onSearch} />
          <WordListResults searchConditions={{ wordID, query, activeTags, maxWords }} onLoadMoreWords={() => setMaxWords(maxWords + 100)} locale={locale} />
        </div>
      </div>
    </>
  );
}
