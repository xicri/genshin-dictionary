import { useEffect, useMemo, useRef } from "react";
import { setupI18n } from "@/libs/i18n";
import { Word } from "@/components/Word";
import { getWords } from "@/libs/words";
import type { FC } from "react";
import type { Locale, SearchConditions } from "@/types";

type Props = {
  searchConditions: SearchConditions,
  locale: Locale,
  onLoadMoreWords: () => void,
};

export const WordListResults: FC<Props> = ({ searchConditions, locale, onLoadMoreWords: emitLoadMoreWords }: Props): JSX.Element => {
  const wordList = useRef<HTMLDivElement>(null);

  //
  // i18n
  //
  const t = setupI18n(locale, {
    en: {
      notFound: "Your search did not match any words in this dictionary.",
    },
    ja: {
      notFound: "該当する語彙が見つかりませんでした。",
    },
    "zh-CN": {
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
        }
      `}</style>

      <main className="results" ref={wordList}>
        { words.map(word => <Word word={word} locale={locale} key={word.en} />)}

        { words.length <= 0 ? (
          <p data-e2e="empty">
            { t("notFound") }
          </p>
        ) : ""}
      </main>
    </>
  );
};
