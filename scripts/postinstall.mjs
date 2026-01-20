/*
 * DO NOT CONVERT THIS FILE TO TYPESCRIPT!
 * This script has to run before `nuxt prepare` command because nuxt.config.ts requires dataset json files which are installed by this script.
 * However, tsconfig.json of this repository depends on .nuxt/tsconfig.json which is installed by `nuxt prepare` command,
 * so this script has to run after `nuxt prepare` if this script was TypeScript.
 * Therefore, you cannot convert this JavaScript file to TypeScript.
 */
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { env } from "node:process";
import "dotenv/config";
import { DateTime } from "luxon";
import { fetch } from "undici";

const staticDatasetDestDirPath = resolve(import.meta.dirname, "../static/dataset");

/**
 * Copy file from URL and save it on local disk.
 * @param {string} src - URL of the source file
 * @param {string} dest - path to save the downloaded file
 */
async function copyFromURL(src, dest) {
  const res = await fetch(src);

  if (400 <= res.status) {
    throw new Error(`Failed to fetch ${ src }
Status code: ${ res.status }`);
  }

  const str = await res.text();
  await writeFile(dest, str);
}

async function downloadDataset() {
  await mkdir(resolve(import.meta.dirname, "../dataset/redirect/"), { recursive: true });

  if (env.LANGDATA_PATH) {
    console.info(`Copying dataset from ${ env.LANGDATA_PATH }`);

    await Promise.all([
      copyFile(
        resolve(env.LANGDATA_PATH, "dist/words.json"),
        resolve(import.meta.dirname, "../dataset/words.json"),
      ),
      copyFile(
        resolve(env.LANGDATA_PATH, "dist/words.csv"),
        resolve(import.meta.dirname, "../dataset/words.csv"),
      ),
      copyFile(
        resolve(env.LANGDATA_PATH, "dist/words-sjis.csv"),
        resolve(import.meta.dirname, "../dataset/words-sjis.csv"),
      ),
      copyFile(
        resolve(env.LANGDATA_PATH, "dist/tags.json"),
        resolve(import.meta.dirname, "../dataset/tags.json"),
      ),
      copyFile(
        resolve(env.LANGDATA_PATH, "dist/redirect/words.json"),
        resolve(import.meta.dirname, "../dataset/redirect/words.json"),
      ),
      copyFile(
        resolve(env.LANGDATA_PATH, "dist/redirect/tags.json"),
        resolve(import.meta.dirname, "../dataset/redirect/tags.json"),
      ),
    ]);

    console.info(`Copied dataset from ${ env.LANGDATA_PATH }`);
  } else {
    console.info("Fetching dataset from dataset.genshin-dictionary.com...");

    await Promise.all([
      copyFromURL(
        "https://dataset.genshin-dictionary.com/words.json",
        resolve(import.meta.dirname, "../dataset/words.json"),
      ),
      copyFromURL(
        "https://dataset.genshin-dictionary.com/words.csv",
        resolve(import.meta.dirname, "../dataset/words.csv"),
      ),
      copyFromURL(
        "https://dataset.genshin-dictionary.com/words-sjis.csv",
        resolve(import.meta.dirname, "../dataset/words-sjis.csv"),
      ),
      copyFromURL(
        "https://dataset.genshin-dictionary.com/tags.json",
        resolve(import.meta.dirname, "../dataset/tags.json"),
      ),
      copyFromURL(
        "https://dataset.genshin-dictionary.com/redirect/words.json",
        resolve(import.meta.dirname, "../dataset/redirect/words.json"),
      ),
      copyFromURL(
        "https://dataset.genshin-dictionary.com/redirect/tags.json",
        resolve(import.meta.dirname, "../dataset/redirect/tags.json"),
      ),
    ]);

    console.info("Fetched dataset from dataset.genshin-dictionary.com.");
  }

  console.info("Copying dataset into the public directory for Web API compatibility...");

  await mkdir(staticDatasetDestDirPath, { recursive: true });

  await Promise.all([
    copyFile(
      resolve(import.meta.dirname, "../dataset/words.json"),
      resolve(staticDatasetDestDirPath, "words.json"),
    ),
    copyFile(
      resolve(import.meta.dirname, "../dataset/words.csv"),
      resolve(staticDatasetDestDirPath, "words.csv"),
    ),
    copyFile(
      resolve(import.meta.dirname, "../dataset/words-sjis.csv"),
      resolve(staticDatasetDestDirPath, "words-sjis.csv"),
    ),
    copyFile(
      resolve(import.meta.dirname, "../dataset/tags.json"),
      resolve(staticDatasetDestDirPath, "tags.json"),
    ),
  ]);

  console.info("Copied dataset into the public directory");
}

async function generateHistoryJson() {
  /**
   * Reverse-sort by the key of the object
   * @param {{ [key: string]: unknown }} obj - object to reverse-sort
   * @returns {{ [key: string]: unknown }} - { [UPDATED_AT]: GIVEN_OBJECT[] }
   */
  function reverseSortObject(obj) {
    /** @type {{ [key:string]: unknown }} */
    const newObj = {};

    for (const key of Object.keys(obj).sort().reverse()) {
      newObj[key] = obj[key];
    }

    return newObj;
  }

  /** @type {{ default: { createdAt: string, [key:string]: unknown }[] }} */
  const { default: allWords } = await import("../dataset/words.json", { with: { type: "json" }});

  /** @type {{ [key:string]: { [key:string]: unknown }[]}} */
  const history = {};

  for (const word of allWords) {
    const createdAt = DateTime.fromISO(word.createdAt);
    const threeMonthsAgo = DateTime.now().minus({ months: 3 });
    const createdAtJa = createdAt.toFormat("yyyy/MM/dd");

    // Ignore words updated before one month ago
    if (createdAt < threeMonthsAgo) {
      continue;
    }

    if (!Array.isArray(history[createdAtJa])) {
      history[createdAtJa] = [];
    }
    history[createdAtJa].push(word);
  }

  // If 300+ words are updated at once, that would be considered resetting createdAt
  // and not be shown in the history.
  for (const [ createdAt, updatedWords ] of Object.entries(history)) {
    if (300 < updatedWords.length) {
      delete history[createdAt];
    }
  }

  const builtDatasetDirPath = resolve(import.meta.dirname, "../dataset/build");
  await mkdir(builtDatasetDirPath, { recursive: true });

  await writeFile(resolve(builtDatasetDirPath, "history.ts"), `
    import type { Word } from "../../types.ts";
    export default ${
      JSON.stringify(reverseSortObject(history), undefined, 2)
    } as { [date: string]: Word[] };
  `);
}

await downloadDataset();
await generateHistoryJson();
