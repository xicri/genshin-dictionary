import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";
import { sleep } from "../utils/utils.ts";

const envs = [
  { id: "current", baseURL: "https://genshin-dictionary.com" },
  { id: "new", baseURL: "http://localhost:5678" },
];
const targets = [
  { path: "/", fullPage: false },
  { path: "/lumine", fullPage: true },
  { path: "/tags/mondstadt", fullPage: false },
  { path: "/history", fullPage: false },
  { path: "/about", fullPage: true },
  { path: "/opendata", fullPage: true },
];

console.info("Generating screenshots for visual regression tests...");

await rm(join(import.meta.dirname, "../tmp/reg-suit"), { force: true, recursive: true });

await Promise.all([
  mkdir(join(import.meta.dirname, "../tmp/reg-suit/current"), { recursive: true }),
  mkdir(join(import.meta.dirname, "../tmp/reg-suit/new"), { recursive: true }),
]);

const browser = await chromium.launch();
const page = await browser.newPage();

for (const env of envs) {
  for (const locale of [ "en", "ja", "zh-CN" ]) {
    for (const target of targets) {
      await page.goto(`${ env.baseURL }/${ locale }${ target.path }`, { waitUntil: "networkidle" });
      await page.screenshot({
        path: join(
          import.meta.dirname,
          `../tmp/reg-suit/${ env.id }/${ locale }_${
            target.path
              .split("/")
              .filter((str) => !!str)
              .join("_")
          }.png`
        ),
        fullPage: target.fullPage,
      });
    }

    // Hamburger Menu
    await page.goto(`${ env.baseURL }/${ locale }`, { waitUntil: "networkidle" });
    await page.locator(".menu__icon").click();
    await sleep(1500); // Wait for the menu to be 100% opened
    await page.screenshot({
      path: join(
        import.meta.dirname,
        `../tmp/reg-suit/${ env.id }/${ locale }_hamburger-menu.png`,
      ),
    });
  }
}

await browser.close();
