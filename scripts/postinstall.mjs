import { copyFile, mkdir, writeFile } from "fs/promises";
import fetch from "node-fetch";
import { resolve } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

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

await mkdir(resolve(__dirname, "../static/dataset/redirect/"), { recursive: true });

if (process.env.LANGDATA_PATH) {
  console.info(`Copying dataset from ${process.env.LANGDATA_PATH}`);

  await Promise.all([
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/words.json"), resolve(__dirname, "../static/dataset/words.json")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/words.csv"), resolve(__dirname, "../static/dataset/words.csv")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/words-sjis.csv"), resolve(__dirname, "../static/dataset/words-sjis.csv")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/tags.json"), resolve(__dirname, "../static/dataset/tags.json")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/redirect/words.json"), resolve(__dirname, "../static/dataset/redirect/words.json")),
    copyFile(resolve(process.env.LANGDATA_PATH, "dist/redirect/tags.json"), resolve(__dirname, "../static/dataset/redirect/tags.json")),
  ]);

  console.info(`Copied dataset from ${process.env.LANGDATA_PATH}`);
} else {
  console.info("Fetching dataset from dataset.genshin-dictionary.com...");

  await Promise.all([
    copyFromURL("https://dataset.genshin-dictionary.com/words.json", resolve(__dirname, "../static/dataset/words.json")),
    copyFromURL("https://dataset.genshin-dictionary.com/words.csv", resolve(__dirname, "../static/dataset/words.csv")),
    copyFromURL("https://dataset.genshin-dictionary.com/words-sjis.csv", resolve(__dirname, "../static/dataset/words-sjis.csv")),
    copyFromURL("https://dataset.genshin-dictionary.com/tags.json", resolve(__dirname, "../static/dataset/tags.json")),
    copyFromURL("https://dataset.genshin-dictionary.com/redirect/words.json", resolve(__dirname, "../static/dataset/redirect/words.json")),
    copyFromURL("https://dataset.genshin-dictionary.com/redirect/tags.json", resolve(__dirname, "../static/dataset/redirect/tags.json")),
  ]);

  console.info("Fetched dataset from dataset.genshin-dictionary.com.");
}
