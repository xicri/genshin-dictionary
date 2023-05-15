import Head from "next/head";
import Link from "next/link";
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
      internalServerError: "System Error",
      errorMsg: "This error is caused by the problem in this website. We are sorry for the inconvenience.<br />Try page reload and check if it addresses this error. If the error still persists, or this error frequently happens, <a href=\"https://twitter.com/xicri_gi\" target=\"_blank\" rel=\"noopener\">Let us know</a>.",
      returnToIndex: "Return to index",
    },
    ja: {
      internalServerError: "システムエラーが発生しました",
      errorMsg: "これは Web サイト側の不具合によるものです。ご迷惑をお掛けし申し訳ありません。<br />ページを更新し、復旧するか試してみてください。それでも直らない場合や、このエラーが頻発する場合は、<a href=\"https://twitter.com/xicri_gi\" target=\"_blank\" rel=\"noopener\">管理者</a>までお問い合わせ下さい。",
      returnToIndex: "トップページへ戻る",
    },
    "zh-CN": {
      internalServerError: "System Error", // TODO
      errorMsg: "This error is caused by the problem in this website. We are sorry for the inconvenience.<br />Try page reload and check if it addresses this error. If the error still persists, or this error frequently happens, <a href=\"https://twitter.com/xicri_gi\" target=\"_blank\" rel=\"noopener\">Let us know</a>.", // TODO
      returnToIndex: "返回到首页",
    },
  });

  return (
    <>
      <style jsx>{`
        @use "_variables.scss" as vars;

        h1, p {
          display: block;
          font-weight: 300;
          color: vars.$color-dark;
          letter-spacing: 1px;
          text-align: center;
        }

        .error {
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 100%;

          &__wrapper {
            max-width: 840px;
            width: 100%;
          }

          &__title {
            font-size: 32px;
            margin: 1vw;
          }

          &__message {
            text-align: left;
            margin-bottom: 0.8vw;
          }

          &__return {
            font-size: 24px;
          }
        }
      `}</style>

      <Head>
        <title>{ t("internalServerError") }</title>
      </Head>

      <div className="error">
        <div className="error__wrapper">
          <h1 className="error__title">
            { t("internalServerError") }
          </h1>
          <p className="error__message" dangerouslySetInnerHTML={{ __html: t("errorMsg") }}></p>

          <p className="error__return"><Link href="/">{ t("returnToIndex") }</Link></p>
        </div>
      </div>
    </>
  );
}
