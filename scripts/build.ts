import { writeFile } from "node:fs/promises";
import { join } from "node:path";
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

await buildRedirectConf();
