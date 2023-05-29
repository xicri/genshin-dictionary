import { WordList } from "@/components/WordList";
import { I18n } from "@/libs/i18n";
import { generateAlternates } from "@/libs/meta";
import { locales } from "@/config";
import type { Locale, Metadata } from "@/types";

type Props = {
  params: { locale: Locale };
};

export async function generateMetaData({ params: { locale }}: Props): Promise<Metadata> {
  //
  // i18n
  //
  const i18n = new I18n(locale, {
    en: {
      titleDesc: "An online English-Chinese-Japanese dictionary of the terms in Genshin Impact",
      description: "An online English-Chinese-Japanese dictionary for terms in Genshin Impact",
    },
    ja: {
      titleDesc: "原神の固有名詞等の英語表記、及び中国語表記の一覧を掲載しています。",
      description: "原神の固有名詞等の英語表記、及び中国語表記の一覧を掲載しています。",
    },
    "zh-CN": {
      titleDesc: "一个在线的中英日三语原神游戏用语辞典",
      description: "一个在线的中英日三语原神游戏用语辞典",
    },
  });

  const title = `${ i18n.t("siteTitle") } ― ${ i18n.t("titleDesc") }`;
  const description = i18n.t("description");
  const { canonical, languages } = generateAlternates("/", locale);

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
}

export async function generateStaticParams(): Promise<{ locale: Locale; }[]> {
  return locales.map(locale => ({ locale }));
}

export default function Index({ params: { locale }}: Props): JSX.Element {
  return (<WordList locale={locale} />);
}
