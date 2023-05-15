import Head from "next/head";
import { useState } from "react";
import { WordList } from "@/components/WordList";
import { setupI18n, validateLocale } from "@/libs/i18n";
import { getTagRedirectDestination } from "@/libs/redirect";
import { validateTag } from "@/libs/tags";
import allTags from "../../../public/dataset/tags.json";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { Locale, TagID } from "@/types";

type Props = {
  locale: Locale,
  tagID: TagID,
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, params }) => {
  try {
    const tagID: TagID = validateTag(params?.id as string);

    const destTagID = getTagRedirectDestination(tagID);
    if (destTagID) {
      return {
        redirect: {
          destination: `/${locale}/tags/${destTagID}/`,
          statusCode: 301,
        },
      };
    }

    return {
      props: {
        locale: validateLocale(locale),
        tagID,
      },
    };
  } catch (err) {
    if (err instanceof TypeError && err.message === "UNEXPECTED_TAG") {
      return {
        notFound: true,
      };
    } else {
      throw err;
    }
  }
};

export default function TagIDPage({ locale, tagID }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const t = setupI18n(locale, {
    en: {},
    ja: {},
    "zh-CN": {},
  });

  const [ title, setTitle ] = useState(`${allTags[tagID].title[locale]} | ${t("siteTitle")}`);

  //
  // Event Handlers
  //
  const onSearch = (): void => {
    const root = `/${locale}/`;

    if (window.location.pathname !== root) {
      history.pushState({}, "", root);
      setTitle(t("siteTitle"));
    }
  };

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={ title } />
        {/* TODO
          <meta name="description" content={ description } />
          <meta property="og:description" content={ description } />
        */}
      </Head>
      <WordList locale={locale} tagID={tagID} onSearch={onSearch} />
    </>
  );
}
