import Head from "next/head";
import { WordList } from "@/components/WordList";
import { I18n, validateLocale, getAvailableLocales } from "@/libs/i18n";
import { validateTag } from "@/libs/tags";
import allTags from "../../../../public/dataset/tags.json";
import type { TagID } from "@/types";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }) {
  const paths = [];

  for (const locale of getAvailableLocales()) {
    for (const tagID of Object.keys(allTags)) {
      paths.push({
        locale,
        id: tagID,
      });
    }
  }
  return paths;
}

export default async function TagIDPage({ params }: Props): Promise<JSX.Element> {
  const { locale: localeParam, id } = await params;
  const locale = validateLocale(localeParam);

  let tagID: TagID;
  try {
    tagID = validateTag(id);
  } catch (err) {
    return <div>Tag not found</div>;
  }

  const i18n = new I18n(locale, {
    en: {},
    ja: {},
    "zh-CN": {},
  });

  const title = `${allTags[tagID].title[locale]} | ${i18n.t("siteTitle")}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        {/* TODO
          <meta name="description" content={ description } />
          <meta property="og:description" content={ description } />
        */}
      </Head>
      <WordList locale={locale} tagID={tagID} />
    </>
  );
}
