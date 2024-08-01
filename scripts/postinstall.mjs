/*
 * DO NOT CONVERT THIS FILE TO TYPESCRIPT!
 * This script has to run before `nuxt prepare` command because nuxt.config.ts requires dataset json files which are installed by this script.
 * However, tsconfig.json of this repository depends on .nuxt/tsconfig.json which is installed by `nuxt prepare` command,
 * so this script has to run after `nuxt prepare` if this script was TypeScript.
 * Therefore, you cannot convert this JavaScript file to TypeScript.
 */
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import { fetch } from "undici";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function copyFromURL(src, dest) {
  const res = await fetch(src);

  if (400 <= res.status) {
    throw new Error(`Failed to fetch ${src}
Status code: ${res.status}`);
  }

  const str = await res.text();
  await writeFile(dest, str);
}

await mkdir(resolve(__dirname, "../dataset/redirect/"), { recursive: true });

if (process.env.LANGDATA_PATH) {
  console.info(`Copying dataset from ${process.env.LANGDATA_PATH}`);

  await Promise.all([
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/words.json"), resolve(__dirname, "../dataset/words.json")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/words.csv"), resolve(__dirname, "../dataset/words.csv")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/words-sjis.csv"), resolve(__dirname, "../dataset/words-sjis.csv")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/tags.json"), resolve(__dirname, "../dataset/tags.json")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/redirect/words.json"), resolve(__dirname, "../dataset/redirect/words.json")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/redirect/tags.json"), resolve(__dirname, "../dataset/redirect/tags.json")),
  ]);

  console.info(`Copied dataset from ${process.env.LANGDATA_PATH}`);
} else {
  console.info("Fetching dataset from dataset.genshin-dictionary.com...");

  await Promise.all([
    copyFromURL("https://dataset.genshin-dictionary.com/words.json", resolve(__dirname, "../dataset/words.json")),
    copyFromURL("https://dataset.genshin-dictionary.com/words.csv", resolve(__dirname, "../dataset/words.csv")),
    copyFromURL("https://dataset.genshin-dictionary.com/words-sjis.csv", resolve(__dirname, "../dataset/words-sjis.csv")),
    copyFromURL("https://dataset.genshin-dictionary.com/tags.json", resolve(__dirname, "../dataset/tags.json")),
    copyFromURL("https://dataset.genshin-dictionary.com/redirect/words.json", resolve(__dirname, "../dataset/redirect/words.json")),
    copyFromURL("https://dataset.genshin-dictionary.com/redirect/tags.json", resolve(__dirname, "../dataset/redirect/tags.json")),
  ]);

  console.info("Fetched dataset from dataset.genshin-dictionary.com.");
}

console.info("Copying dataset into the public directory for Web API compatibility...");

await mkdir(resolve(__dirname, "../public/dataset/"), { recursive: true });

await Promise.all([
  copyFile(resolve(__dirname, "../dataset/words.json"), resolve(__dirname, "../public/dataset/words.json")),
  copyFile(resolve(__dirname, "../dataset/words.csv"), resolve(__dirname, "../public/dataset/words.csv")),
  copyFile(resolve(__dirname, "../dataset/words-sjis.csv"), resolve(__dirname, "../public/dataset/words-sjis.csv")),
  copyFile(resolve(__dirname, "../dataset/tags.json"), resolve(__dirname, "../public/dataset/tags.json")),
]);

console.info("Copied dataset into the public directory");
