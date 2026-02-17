import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { headers } from "../src/app.config.ts";
import tagRedirects from "../src/lib/dataset/redirect/tags.json";
import wordRedirects from "../src/lib/dataset/redirect/words.json";

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

await Promise.all([
  buildRedirectConf(),
  buildHeaders(),
]);
