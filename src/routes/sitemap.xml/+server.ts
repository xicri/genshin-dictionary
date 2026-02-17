import { response as sitemapResponse } from "super-sitemap";
import type { RequestHandler } from "@sveltejs/kit";
import words from "$lib/dataset/words.json" with { type: "json" };
import tags from "$lib/dataset/tags.json" with { type: "json" };
import { supportedLocales } from "../../app.config";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const tagSlugs = Object.keys(tags);

  return await sitemapResponse({
    origin: "https://genshin-dictionary.com",
    sort: "alpha",
    defaultChangefreq: "daily",
    defaultPriority: 0.9,

    paramValues: {
      "/[wordSlug]": words.map(({ id: wordSlug, updatedAt: lastmod }) => ({
        values: [ wordSlug ],
        lastmod,
      })),

      "/tags/[slug]": tagSlugs.map((tagSlug) => (tagSlug)),
    },
    processPaths: (paths) =>
      paths.map(({ path }) =>
        supportedLocales.map((locale) => ({
          path: `/${ locale }${ path }`,
        })),
      ).flat(),
  });
};
