import { groupBy } from "lodash";
import { useEffect, useMemo, useRef } from "react";
import { setupI18n } from "@/libs/i18n";
import { Word } from "@/components/Word";
import { getWords } from "@/libs/words";
import type { FC } from "react";
import type { Locale, SearchConditions } from "@/types";

type Props = {
  searchConditions: SearchConditions,
  historyMode: boolean,
  locale: Locale,
  onLoadMoreWords: () => void,
};

export const WordListResults: FC<Props> = ({ searchConditions, historyMode, locale, onLoadMoreWords: emitLoadMoreWords }: Props): JSX.Element => {
  const wordList = useRef<HTMLDivElement>(null);
  const infiniteScrollTrigger = useRef<HTMLDivElement>(null);

  //
  // i18n
  //
  const t = setupI18n(locale, {
    en: {
      updatedOn: "Updated on {createdOn}",
      notFound: "Your search did not match any words in this dictionary.",
    },
    ja: {
      updatedOn: "{createdOn} 更新",
      notFound: "該当する語彙が見つかりませんでした。",
    },
    "zh-CN": {
      updatedOn: "更新于{createdOn}",
      notFound: "未找到匹配的词汇。",
    },
  });

  //
  // Lifecycle Hooks
  //
  useEffect(() => {
    const currentInfiniteScrollTrigger = infiniteScrollTrigger.current;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          return;
        }

        emitLoadMoreWords();
      }
    });

    if (currentInfiniteScrollTrigger) {
      observer.observe(currentInfiniteScrollTrigger);
    }

    return () => {
      if (currentInfiniteScrollTrigger) {
        observer.unobserve(currentInfiniteScrollTrigger);
      }
    };
  }, [ emitLoadMoreWords, infiniteScrollTrigger ]);

  const { words, history, fullLength } = useMemo(() => {
    if (!historyMode) {
      const { words, fullLength } = getWords(searchConditions);

      return {
        words,
        fullLength,
      };
    } else {
      const { words, fullLength } = getWords({ ...searchConditions, sortBy: "createdAt" });
      const history = groupBy(words, "createdAt");
      return {
        history,
        fullLength,
      };
    }
  }, [ historyMode, searchConditions ]);

  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

        .results {
          width: 100%;

          @media (max-width: vars.$max-width) { // Mobile
            padding-left: vars.$side-margin;
            padding-right: vars.$side-margin;
          }

          &__updated-at {
            display: flex;
            align-items: center;
            margin-top: 2.5em;

            &:after {
              border-top: 1px solid vars.$color-dark;
              content: "";
              flex-grow: 1;
              margin-left: 0.4em;
              // By default, align-items: center does not center the line perfectly.
              // By adding margin-top, I can center the line more accurately.
              margin-top: 0.25em;
            }
          }

          &__observer {
            width: 1px;
            height: 1px;
            background-color: transparent;
          }
        }
      `}</style>

      <main className="results" ref={wordList}>
        { words ? (
          <div>
            { words.map(word => <Word word={word} locale={locale} key={word.id} />) }
          </div>
        ) : history ?
          Object.keys(history)
            .filter(key => key !== "undefined")
            .sort().reverse()
            .map(createdDate => (
              <div key={createdDate}>
                <h3 className="results__updated-at">
                  { t("updatedOn", { createdOn: createdDate }) }
                </h3>
                {/* Required to be enclosed by <div> so that CSS' :last-child works */}
                <div>
                  { history[createdDate].map(word => <Word word={word} locale={locale} key={word.id} />) }
                </div>
              </div>
            )) : ""
        }

        { words && words.length <= 0 ? (
          <p data-e2e="empty">
            { t("notFound") }
          </p>
        ) : ""}

        {
          (
            (words && 0 < words.length && words.length < fullLength) ||
            (history &&
              Object.values(history)
                .map(words => words.length)
                .reduce((wordCountA, wordCountB) => wordCountA + wordCountB, 0) < fullLength
            )
          ) ? (<div ref={infiniteScrollTrigger} className="results__observer"></div>) : ""
        }
      </main>
    </>
  );
};
