import allWords from "../../public/dataset/words.json";
import allTags from "../../public/dataset/tags.json";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  type route = {
    path: string,
    lastmod?: string,
  };
  const base = "https://genshin-dictionary.com";
  const routes: route[] = [
    ...([ "en", "ja" , "zh-CN" ].map(lang => ([
      { path: `/${lang}/` },
      { path: `/${lang}/history/` },
      ...(allWords.map(word => ({ path: `/${lang}/${word.id}/`, lastmod: word.updatedAt }))),
      ...(Object.keys(allTags).map(tagID => ({ path: `/${lang}/tags/${tagID}/` }))),
    ])).flat()),
    // Pages not translated yet
    { path: "/ja/about/" },
    { path: "/ja/opendata/" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${ routes.map(({ path, lastmod }) => `
        <url>
          <loc>${ base + path }</loc>
          ${ lastmod ? `<lastmod>${ lastmod }</lastmod>` : "" }
        </url>
      `).join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

const SiteMap = (): void => {
  // Do nothing
};

export default SiteMap;
