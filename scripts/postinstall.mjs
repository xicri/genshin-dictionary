import { mkdir, writeFile } from "fs/promises";
import fetch from "node-fetch";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function copyFromURL(src, dest) {
  const res = await fetch(src);
  const str = await res.text();
  await writeFile(dest, str);
}

console.info("Fetching dataset from dataset.genshin-dictionary.com...");

await mkdir(resolve(__dirname, "../static/dataset/"), { recursive: true });
await Promise.all([
  copyFromURL("https://dataset.genshin-dictionary.com/words.json", resolve(__dirname, "../static/dataset/words.json")),
  copyFromURL("https://dataset.genshin-dictionary.com/words.csv", resolve(__dirname, "../static/dataset/words.csv")),
  copyFromURL("https://dataset.genshin-dictionary.com/words-sjis.csv", resolve(__dirname, "../static/dataset/words-sjis.csv")),
  copyFromURL("https://dataset.genshin-dictionary.com/tags.json", resolve(__dirname, "../static/dataset/tags.json")),
]);

console.info("Fetched dataset from dataset.genshin-dictionary.com.");
