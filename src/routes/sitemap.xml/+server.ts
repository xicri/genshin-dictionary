import { Readable } from "node:stream";
import { SitemapStream, streamToPromise } from "sitemap";
import tags from "../../../dataset/tags.json" with { type: "json" };
import words from "../../../dataset/words.json" with { type: "json" };
import { locales } from "$lib/paraglide/runtime.js";
import type { Word } from "$lib/types";

const tagIDs = Object.keys(tags);

export async function GET() {
  try {
    const sitemapStream = Readable.from([
      ...(locales.map((locale) => [
        { loc: `/${ locale }` },
        { loc: `/${ locale }/history` },
        { loc: `/${ locale }/about` },
        { loc: `/${ locale }/opendata` },
        ...((words as Word[]).map((word) => ({ loc: `/${ locale }/${ word.id }`, lastmod: word.updatedAt }))),
        ...(tagIDs.map((tagID) => ({ loc: `/${ locale }/tags/${ tagID }` }))),
      ]).flat()),
    ]).pipe(new SitemapStream({
      hostname: "https://example.com/",
    }));

    const sitemapString = (await streamToPromise(sitemapStream)).toString();

    return new Response(sitemapString, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error(err);
  }
}
