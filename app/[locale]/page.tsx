import Head from "next/head";
import { WordList } from "@/components/WordList";
import { validateLocale } from "@/libs/i18n";
import type { Locale } from "@/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function IndexPage({ params }: Props): Promise<JSX.Element> {
  const { locale: localeParam } = await params;
  const locale = validateLocale(localeParam);

  return (
    <>
      <Head>
        {/* Same as default title & description defined in [locale]/layout.tsx:

          <title>{`${ t("siteTitle") } ― ${ t("titleDesc") }`}</title>
          <meta property="og:title" content={`${ t("siteTitle") } ― ${ t("titleDesc") }`} />
          <meta name="description" content={ t("defaultDescription") } />
          <meta property="og:description" content={ t("defaultDescription") } />
        */}
      </Head>
      <WordList locale={locale} />
    </>
  );
}
