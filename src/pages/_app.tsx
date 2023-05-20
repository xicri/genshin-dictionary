import App from "next/app";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import { I18n, getAvailableLocales, validateLocale } from "@/libs/i18n";
import "@/styles/globals.scss";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import type { Locale } from "@/types";

type OwnProps = {
  locale: Locale,
  canonical: string,
  alternates: {
    hrefLang: Locale,
    href: string,
  }[],
};

const GenshinDictionary = ({ Component, pageProps, locale, canonical, alternates }: AppProps & OwnProps): JSX.Element => {
  const i18n = new I18n(locale, {
    en: {
      defaultDescription: "An online English-Chinese-Japanese dictionary for terms in Genshin Impact",
    },
    ja: {
      defaultDescription: "原神の固有名詞等の英語表記、及び中国語表記の一覧を掲載しています。",
    },
    "zh-CN": {
      defaultDescription: "一个在线的中英日三语原神游戏用语辞典",
    },
  });

  return (
    <>
      <Head>
        {/* ▼▼ Default values ― will be overwritten in each page components ▼▼ */}
        <title>{`${ i18n.t("siteTitle") } ― ${ i18n.t("titleDesc") }`}</title>
        <meta property="og:title" content={`${ i18n.t("siteTitle") } ― ${ i18n.t("titleDesc") }`} />
        <meta name="description" content={ i18n.t("defaultDescription") } />
        <meta property="og:description" content={ i18n.t("defaultDescription") } />
        {/* ▲▲ Default values ― will be overwritten in each page components ▲▲ */}
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
        { alternates.map(({ hrefLang, href }) => (<link rel="alternate" hrefLang={hrefLang} href={href} key={hrefLang} />))}
        <meta property="og:site_name" content={ i18n.t("siteTitle") } />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout locale={validateLocale(pageProps.locale)}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

GenshinDictionary.getInitialProps = async (context: AppContext): Promise<OwnProps & AppInitialProps> => {
  const defaultInitialProps = await App.getInitialProps(context);
  const locale = validateLocale(context.router.locale);

  return {
    ...defaultInitialProps,
    locale,
    canonical: `https://genshin-dictionary.com/${locale}${context.ctx.asPath}`,
    alternates: getAvailableLocales().map(loc => ({
      hrefLang: loc,
      href: `https://genshin-dictionary.com/${loc}${context.ctx.asPath}`,
    })),
  };
};

export default GenshinDictionary;
