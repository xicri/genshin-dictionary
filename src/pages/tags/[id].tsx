import Head from "next/head";
import { useState } from "react";
import { WordList } from "@/components/WordList";
import { I18n, validateLocale, validateLocales } from "@/libs/i18n";
import { validateTag } from "@/libs/tags";
import allTags from "../../../public/dataset/tags.json";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import type { Locale, TagID } from "@/types";

type Props = {
  locale: Locale,
  tagID: TagID,
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = [];

  for (const locale of validateLocales(locales)) {
    for (const tagID of Object.keys(allTags)) {
      paths.push({
        params: { id: tagID },
        locale,
      });
    }
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale, params }) => {
  try {
    const tagID: TagID = validateTag(params?.id as string);

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

export default function TagIDPage({ locale, tagID }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const i18n = new I18n(locale, {
    en: {},
    ja: {},
    "zh-CN": {},
  });

  const [ title, setTitle ] = useState(`${allTags[tagID].title[locale]} | ${i18n.t("siteTitle")}`);

  //
  // Event Handlers
  //
  const onSearch = (): void => {
    const root = `/${locale}/`;

    if (window.location.pathname !== root) {
      history.pushState({}, "", root);
      setTitle(i18n.t("siteTitle"));
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
