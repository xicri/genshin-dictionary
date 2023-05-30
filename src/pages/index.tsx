import Head from "next/head";
import { WordList } from "@/components/WordList";
import { validateLocale } from "@/libs/i18n";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { Locale } from "@/types";

export const config = {
  runtime: "edge",
};

type Props = {
  locale: Locale,
};

export const getServerSideProps: GetServerSideProps = async ({ locale }): Promise<{ props: Props }> => ({
  props: {
    locale: validateLocale(locale),
  },
});

export default function Index({ locale }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
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
