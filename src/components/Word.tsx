import { I18n } from "@/libs/i18n";
import { Tag } from "@/components/Tag";
import { Translation } from "@/components/Translation";
import { sleep } from "@/libs/utils";
import type { FC, MouseEvent as ReactMouseEvent } from "react";
import type { BuiltWord, Locale } from "@/types";

type Props = {
  locale: Locale,
  word: BuiltWord,
};

export const Word: FC<Props> = ({ locale, word }: Props): JSX.Element => {
  //
  // Event handlers
  //
  const copyLink = async (wordId: string, evt: ReactMouseEvent<HTMLImageElement, MouseEvent>): Promise<void> => {
    navigator.clipboard.writeText(`https://genshin-dictionary.com/${locale}/${wordId}/`);

    const copyImg = evt.currentTarget;

    if (!copyImg?.parentElement) {
      return;
    }

    const copiedImg = copyImg.parentElement.getElementsByClassName("results__permalink--copied")[0] as HTMLElement;
    copyImg.style.display = "none";
    copiedImg.style.display = "inline";

    await sleep(1000);

    copiedImg.style.display = "none";
    copyImg.style.display = "inline";
  };

  //
  // i18n
  //
  const i18n = new I18n(locale, {
    en: {
      example: "Example",
      permalink: "Permalink",
      permalinkAlt: "Link to {word}",
      copyLink: "Copy link to {word}",
      copyLinkDone: "Copied link to {word}",
    },
    ja: {
      example: "例文",
      permalink: "固定リンク",
      permalinkAlt: "{word}のページへのリンク",
      copyLink: "{word}のページへのリンクをコピー",
      copyLinkDone: "{word}のページへのリンクのコピーが完了しました",
    },
    "zh-CN": {
      example: "示例",
      permalink: "永久链接",
      permalinkAlt: "{word}的链接",
      copyLink: "复制{word}的链接",
      copyLinkDone: "已复制{word}的链接",
    },
  });

  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

        a {
          text-decoration: none;
        }

        h5 {
          font-size: 12px;
        }
        h5.linebreak {
          margin-bottom: 0.4em;
        }

        .results {
          &__word {
            display: flex;
            flex-direction: column;

            padding-top: 16px;
            padding-bottom: 16px;

            border-bottom: 1px solid vars.$color-lighter;

            &:last-child {
              border-bottom: 0 none;
            }
          }

          &__translations {
            display: table;
            border-spacing: 0.2rem;

            font-size: 16px;

            margin-bottom: 0.7em;
          }

          &__description {
            font-size: 12px;
          }
          &__description-section {
            margin-bottom: 1.2em;
          }
          &__description-section-level2 {
            margin-bottom: 0.8em;
          }

          &__example-ref {
            margin-left: 2em;
          }

          &__tags {
            width: 100%;

            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            font-size: 12px;
          }

          &__last-update {
            width: 100%;
            text-align: right;
            margin-top: 8px;
          }

          &__permalink {
            width: 100%;
            text-align: right;
            margin-top: 8px;

            &--copy {
              width: 1em;
              height: 1em;
              cursor: pointer;
              margin-left: 0.25em;
            }
            &--copied {
              width: 1em;
              height: 1em;
              margin-left: 0.25em;
            }
          }

          &__permalink--icon {
            width: 1em;
            height: 1em;
          }
        }
      `}</style>

      <div key={word.en} className="results__word">
        <h4 className="results__translations">
          { locale === "en" ? (
            <>
              <Translation lang="en" word={word.en} locale={locale} />
              { word.zhCN ? (<Translation lang="zh-CN" word={word.zhCN} locale={locale} pinyins={word.pinyins} />) : "" }
              { word.ja ? (<Translation lang="ja" word={word.ja} kana={word.pronunciationJa} locale={locale} />) : "" }
            </>
          ) : "" }
          { locale === "ja" ? (
            <>
              { word.ja ? (<Translation lang="ja" word={word.ja} kana={word.pronunciationJa} locale={locale} />) : "" }
              <Translation lang="en" word={word.en} locale={locale} />
              { word.zhCN ? (<Translation lang="zh-CN" word={word.zhCN} locale={locale} pinyins={word.pinyins} />) : "" }
            </>
          ) : "" }
          { locale === "zh-CN" ? (
            <>
              { word.zhCN ? (<Translation lang="zh-CN" word={word.zhCN} locale={locale} pinyins={word.pinyins} />) : "" }
              <Translation lang="en" word={word.en} locale={locale} />
              { word.ja ? (<Translation lang="ja" word={word.ja} kana={word.pronunciationJa} locale={locale} />) : "" }
            </>
          ) : "" }
        </h4>
        <div className="results__description">
          <div className="results__tags results__description-section">
            { word.tags?.map(tag => (
              <a key={tag} href={`/${locale}/tags/${tag}/`}>
                <Tag tagID={tag} locale={locale} />
              </a>
            ))}
          </div>
          { (word.notes && locale === "ja") ? (<div className="results__description-section" data-e2e="notes" dangerouslySetInnerHTML={{ __html: word.notes }}></div>) : "" }
          { (word.notesZh && locale === "zh-CN") ? (
            <div className="results__description-section" data-e2e="notesZh" dangerouslySetInnerHTML={{ __html: word.notesZh }}></div>
          ) : "" }
          { (word.examples && 0 < word.examples.length) ? (
            <div className="results__description-section">
              <h5 className="linebreak">
                { i18n.t("example") }
              </h5>
              { word.examples.map(example => (
                <div key={example.en} className="results__description-section-level2">
                  <p>&quot;{ example.en }&quot;</p>
                  <p>「{ example.ja }」</p>
                  { (example.ref && locale === "ja") ? (
                    <>
                      <p className="results__example-ref">
                        { example.refURL ? (
                          <>― <a href={example.refURL} target="_blank" rel="noopener">{ example.ref }</a></>
                        ) : (
                          <>― { example.ref }</>
                        ) }
                      </p>
                    </>
                  ) : "" }
                </div>
              )) }
            </div>
          ) : "" }
          <div className="results__permalink">
            <a href={`/${locale}/${word.id}/`}>
              {/*
                Approximate values of width & height are specified in HTML to mitigate Comulative Layout Shift,
                but actual values are specified in SCSS.
              */}
              <img
                src="/vendor/octicons/link.svg"
                width="12"
                height="12"
                alt={i18n.t("permalinkAlt", { word: word[locale.replace("zh-CN", "zhCN") as "en"|"ja"|"zhCN"] ?? word.en })}
                decoding="async"
                className="results__permalink--icon"
              /> {i18n.t("permalink")}
            </a>
            <img
              src="/vendor/octicons/copy.svg"
              width="12"
              height="12"
              alt={i18n.t("copyLink", { word: word[locale.replace("zh-CN", "zhCN") as "en"|"ja"|"zhCN"] ?? word.en })}
              decoding="async"
              className="results__permalink--copy"
              onClick={async (evt) => copyLink(word.id, evt)}
            />
            <img
              src="/vendor/octicons/check.svg"
              width="12"
              height="12"
              alt={i18n.t("copyLinkDone", { word: word[locale.replace("zh-CN", "zhCN") as "en"|"ja"|"zhCN"] ?? word.en })}
              decoding="async"
              className="results__permalink--copied"
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
