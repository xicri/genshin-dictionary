import { rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { simpleSitemapAndIndex } from "sitemap";
import { headers, supportedLocales } from "../src/app.config.ts";
import words from "../dataset/words.json" with { type: "json" };
import tags from "../dataset/tags.json" with { type: "json" };
import tagRedirects from "../dataset/redirect/tags.json";
import wordRedirects from "../dataset/redirect/words.json";

const buildRedirectConf = async () => {
  const cfPagesRedirectConf: string = [
    ...(
      Object.entries(wordRedirects)
        .map(([ oldSlug, newSlug ]) => `/:lang/${ oldSlug } /:lang/${ newSlug } 301`)
    ),
    ...(
      Object.entries(tagRedirects)
        .map(([ oldSlug, newSlug ]) => `/:lang/tags/${ oldSlug } /:lang/tags/${ newSlug } 301`)
    ),
  ].join("\n");

  await writeFile(join(import.meta.dirname, "../_redirects"), cfPagesRedirectConf);
};

const buildHeaders = async () => {
  const _headersText = "/*\n" + Object.entries(headers)
    .map(([ header, val ]) => `  ${ header }: ${ val }`)
    .join("\n");

  await writeFile(join(import.meta.dirname, "../_headers"), _headersText);
};

const buildSitemapXml = async () => {
  const sitemapDirPath = join(import.meta.dirname, "../static/sitemaps");
  const tagIDs = Object.keys(tags);

  await rm(sitemapDirPath, {
    recursive: true,
    force: true,
  });

  await simpleSitemapAndIndex({
    hostname: "https://genshin-dictionary.com",
    destinationDir: sitemapDirPath,
    sourceData: supportedLocales.map((locale) => [
      { url: `/${ locale }` },
      { url: `/${ locale }/history` },
      { url: `/${ locale }/about` },
      { url: `/${ locale }/opendata` },
      ...(words.map(({ id: wordId, updatedAt: lastmod }) => ({
        url: `/${ locale }/${ wordId }`,
        lastmod,
      }))),
      ...(tagIDs.map((tagID) => ({ url: `/${ locale }/tags/${ tagID }` }))),
    ]).flat(),

    // DEBUG: remove comment to generate sitemap with text (non-gziped XML) format
    // gzip: false,
  });
};

await Promise.all([
  buildRedirectConf(),
  buildHeaders(),
  buildSitemapXml(),
]);
