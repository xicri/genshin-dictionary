import Head from "next/head";
import { setupI18n, validateLocale } from "@/libs/i18n";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { Locale } from "@/types";

type Props = {
  locale: Locale,
};

export const getStaticProps: GetStaticProps = async ({ locale }): Promise<{ props: Props }> => ({
  props: {
    locale: validateLocale(locale),
  },
});

export default function NotFound({ locale }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const t = setupI18n(locale, {
    en: {
      notFound: "This page is not found",
      returnToIndex: "Return to index",
    },
    ja: {
      notFound: "このページは存在しません",
      returnToIndex: "トップページへ戻る",
    },
    "zh-CN": {
      notFound: "页面不存在",
      returnToIndex: "返回到首页",
    },
  });

  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

        h1, h2 {
          display: block;
          font-weight: 300;
          color: vars.$color-dark;
          letter-spacing: 1px;
          text-align: center;
        }

        .error {
          &__title {
            font-size: 32px;
            margin: 1vw;
          }
        }
      `}</style>

      <Head>
        <title>{ t("notFound") }</title>
        <meta property="og:title" content={ t("notFound") } />
      </Head>

      <h1 className="error__title">
        { t("notFound") }
      </h1>
      <h2><a href="/">{ t("returnToIndex") }</a></h2>
    </>
  );
}
