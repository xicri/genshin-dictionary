import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { locales } from "../nuxt.config.ts";
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

  await writeFile(join(import.meta.dirname, "../public/_redirects"), cfPagesRedirectConf);
};

const buildLocaleJson = async () => {
  const tmpDirPath = join(import.meta.dirname, "../tmp/");
  const localeCodes = locales.map((locale) => locale.code);

  await mkdir(tmpDirPath, { recursive: true });
  await writeFile(
    join(tmpDirPath, "locales.json"),
    JSON.stringify(localeCodes, undefined, 2),
  );
};

await Promise.all([
  buildRedirectConf(),
  buildLocaleJson(),
]);
