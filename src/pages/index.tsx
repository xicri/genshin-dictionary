import Head from "next/head";
import { WordList } from "@/components/WordList";
import { validateLocale } from "@/libs/i18n";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { Locale } from "@/types";

type Props = {
  locale: Locale,
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    locale: validateLocale(locale),
  },
});

export default function Index({ locale }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head>
        {/* Same as default title & description defined in _app.tsx:

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
