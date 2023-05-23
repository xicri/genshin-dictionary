import { I18n } from "@/libs/i18n";
import { escapeHtmlString } from "@/libs/utils";
import type { Locale } from "@/types";

type Props = {
  locale: Locale,
  lang: "en" | "ja" | "zh-CN",
  word: string,
  kana?: string,
  pinyins?: { char: string, pron: string }[]
};

export function Translation({ locale, lang, word, kana = "", pinyins = []}: Props): JSX.Element {
  //
  // i18n
  //
  const i18n = new I18n(locale, {
    en: {
      langNameEn: "English",
      langNameJa: "Japanese",
      langNameZhCN: "Chinese",
    },
    ja: {
      langNameEn: "英語",
      langNameJa: "日本語",
      langNameZhCN: "中国語",
    },
    "zh-CN": {
      langNameEn: "英语",
      langNameJa: "日语",
      langNameZhCN: "简体中文",
    },
  });

  let langName;

  if (lang === "en") {
    langName = i18n.t("langNameEn");
  } else if (lang === "ja") {
    langName = i18n.t("langNameJa");
  } else if (lang === "zh-CN") {
    langName = i18n.t("langNameZhCN");
  }

  let wordWithPinyin;

  if (0 < pinyins.length) {
    wordWithPinyin = escapeHtmlString(word);
    for (const { char, pron } of pinyins) {
      const escapedChar = escapeHtmlString(char);
      const escapedPron = escapeHtmlString(pron);
      wordWithPinyin = wordWithPinyin.replaceAll(escapedChar, `<ruby>${escapedChar}<rp>(</rp><rt style="font-weight: lighter;">${escapedPron}</rt><rp>)</rp></ruby>`);
    }
  }

  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

        .results {
          &__translation {
            display: table-row;
          }

          &__translation-item {
            display: table-cell;
          }

          &__langname {
            font-size: 0.7em;
            width: 4.5em;
            white-space: nowrap;
          }


          &__ja {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            column-gap: 0.25em;

            width: 100%;
            height: 100%;
          }

          &__pronunciation-ja {
            font-size: 0.7em;
          }
        }
      `}</style>

      <div className="results__translation">
        <span className="results__langname results__translation-item">{ langName }: </span>
        <div className="results__translation-item">
          <div className="results__ja">
            { wordWithPinyin ? (
              <span lang="zh-CN" data-e2e="zh-CN" dangerouslySetInnerHTML={{ __html: wordWithPinyin }}></span>
            ) : (
              <span lang={lang} data-e2e={lang}>{ word }</span>
            )}
            { kana ? (<span className="results__pronunciation-ja">({ kana })</span>) : "" }
          </div>
        </div>
      </div>
    </>
  );
}
