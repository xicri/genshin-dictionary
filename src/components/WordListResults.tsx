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
    const observer = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          return;
        }

        observer.unobserve(entry.target);
        emitLoadMoreWords();
      }
    });

    const addIntersectionObserver = (): void => {
      const wordCards = wordList.current?.getElementsByClassName("results__word");
      const lastWordCard = wordCards?.[wordCards.length - 1];

      if (lastWordCard) {
        observer.observe(lastWordCard); // add observer to the last word element
      }
    };

    addIntersectionObserver();
  }, [ emitLoadMoreWords ]);

  const words = useMemo(() => searchConditions ? getWords(searchConditions) : [], [ searchConditions ]);

  const history = useMemo(() => historyMode ? groupBy(getWords({ sortBy: "createdAt" }), "createdAt") : {}, [ historyMode ]);
  const createdDates = useMemo(() => Object.keys(history).filter(key => key !== "undefined").sort().reverse(), [ history ]);

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
        }
      `}</style>

      <main className="results" ref={wordList}>
        { historyMode ?
          createdDates.map(createdDate => (
            <div key={createdDate}>
              <h3 className="results__updated-at">
                { t("updatedOn", { createdOn: createdDate }) }
              </h3>
              {/* Required to be enclosed by <div> so that CSS' :last-child works */}
              <div>
                { history[createdDate].map(word => <Word word={word} locale={locale} key={word.id} />) }
              </div>
            </div>
          )) :
          words.map(word => <Word word={word} locale={locale} key={word.id} />)
        }

        { words.length <= 0 ? (
          <p data-e2e="empty">
            { t("notFound") }
          </p>
        ) : ""}
      </main>
    </>
  );
};
