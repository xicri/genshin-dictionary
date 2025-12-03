import Head from "next/head";
import { WordList } from "@/components/WordList";
import { I18n, validateLocale, getAvailableLocales } from "@/libs/i18n";
import { getWords } from "@/libs/words";
import allWords from "../../../public/dataset/words.json";
import type { BuiltWord, Locale } from "@/types";

type Props = {
  params: Promise<{ locale: string; wordid: string }>;
};

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }) {
  const paths = [];

  for (const locale of getAvailableLocales()) {
    for (const word of allWords) {
      paths.push({
        locale,
        wordid: word.id,
      });
    }
  }
  return paths;
}

export default async function WordIDPage({ params }: Props): Promise<JSX.Element> {
  const { locale: localeParam, wordid } = await params;
  const locale = validateLocale(localeParam);

  const { words } = getWords({ wordID: wordid });
  const word: BuiltWord | undefined = words[0];

  if (!word) {
    return <div>Word not found</div>;
  }

  const i18n = new I18n(locale, {
    en: {},
    ja: {},
    "zh-CN": {},
  });

  //
  // title & description
  //
  let title;
  let description;

  if (locale === "en") {
    title = `"${word.en}" is ` + (word.zhCN ? `"${word.zhCN}" in Chinese` : `${word.ja} in Japanese`) + ` | ${i18n.t("siteTitle")}`;
    description = `"${word.en}" is `
      + (word.zhCN ? `"${word.zhCN}" in Chinese and ` : "")
      + `"${word.ja}" in Japanese. This website contains English, Chinese, and Japanese translations for terms in Genshin Impact.`;
  } else if (locale === "ja") {
    title = `「${word.ja}」は英語で "${word.en}" | ${i18n.t("siteTitle")}`;
    description = `「${word.ja}」の英語表記は "${word.en}"`
      + (word.zhCN ? `、中国語表記は「${word.zhCN}」` : "")
      + " ― このサイトはゲーム「原神」の用語の、日本語・英語・中国語の対訳を掲載しています。";
  } else if (locale === "zh-CN") {
    title = (word.zhCN ? `"${word.zhCN}"的英语和日语翻译` : `"${word.en}"的日语翻译`) + ` | ${i18n.t("siteTitle")}`;
    description = word.zhCN ?
      `"${word.zhCN}"的英语是"${word.en}"，日语是"${word.ja}"。` : // TODO TranslationChanged
      `"${word.en}"的日语是"${word.ja}"。`;
  } else {
    throw new Error(`Unexpected locale: ${locale}`);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <WordList locale={locale} wordID={word.id} />
    </>
  );
}
