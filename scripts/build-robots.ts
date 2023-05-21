import { config } from "dotenv";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

config(); // dotenv config

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const robotsTxt = `UserAgent: *
${ process.env.SERVER_ENV === "production" ? `
Allow: /
Sitemap: https://genshin-dictionary.com/sitemap.xml
` : "Disallow: /" }`;

await writeFile(join(__dirname, "../public/robots.txt"), robotsTxt);
