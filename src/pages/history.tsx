import Head from "next/head";
import { WordList } from "@/components/WordList";
import { I18n, validateLocale } from "@/libs/i18n";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { Locale } from "@/types";

type Props = {
  locale: Locale,
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }): Promise<{ props: Props }> => ({
  props: {
    locale: validateLocale(locale),
  },
});

export default function HistoryPage({ locale }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const i18n = new I18n(locale, {
    en: {
      title: "Update History",
      // description: "", // TODO
    },
    ja: {
      title: "更新履歴",
      // description: "", // TODO
    },
    "zh-CN": {
      title: "更新记录",
      // description: "", // TODO
    },
  });
  const title = `${ i18n.t("title") } | ${ i18n.t("siteTitle") }`;

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={ title } />
        {/* TODO
          <meta name="description" content={ t("description") } />
          <meta property="og:description" content={ t("description") } />
        */}
      </Head>

      <style jsx>{`
        @use "_variables.scss" as vars;

        .history {
          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;

          &__empty {
              color: vars.$color-dark;
          }
        }

        @media (max-width: vars.$max-width) { // Mobile
          .history {
            padding-left: vars.$side-margin;
            padding-right: vars.$side-margin;

            // Avoid overwrap when the user scrolled at the bottom of the page
            margin-bottom: 11em;
          }
        }
      `}</style>

      <div className="history">
        <h2>{ i18n.t("title") }</h2>

        <WordList locale={locale} historyMode={true} />
      </div>
    </>
  );
}
