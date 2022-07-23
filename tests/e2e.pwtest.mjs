import { test, expect } from "@playwright/test";
import express from "express";
import { loadNuxt, build } from "nuxt";

const { describe, beforeAll, afterAll } = test;

describe("The Genshin English Dictionary", () => {
  const ip = "127.0.0.1";
  const port = 5678;
  const rootURL = `http://${ip}:${port}`;

  let server;

  beforeAll(async () => {
    const app = express();
    const nuxt = await loadNuxt("dev");

    app.use(nuxt.render);
    build(nuxt);

    server = app.listen(port, ip);
  });

  afterAll(() => {
    server.close();
  });

  test("search by Japanese", async ({ page }) => {
    await page.goto(rootURL);
    const searchBox = await page.$("input[name='searchbox']");
    await searchBox.fill("狂戦士の仮面");

    await page.waitForTimeout(1400); // Wait for the search results to be shown

    const words = await page.$$(".results__word");
    await expect(words).toHaveLength(1);

    const word = words[0];
    const ja = await word.$("span[data-e2e='ja']");
    const en = await word.$("*[data-e2e='en']");
    const pronunciationJa = await word.$(".results__pronunciation-ja");
    const notes = await word.$("div[data-e2e='notes']");
    const permalink = await word.$(".results__permalink > a");

    expect(await ja.innerText()).toBe("狂戦士の仮面");
    expect(await en.innerText()).toBe("Berserker's Battle Mask");
    expect(await pronunciationJa.innerText()).toBe("(きょうせんしのかめん)");
    expect(await notes.innerText()).toBe("聖遺物セット「狂戦士」(Berserker) の1つ");
    expect(await permalink.getAttribute("href")).toBe("/berserkers-battle-mask/");

    const tags = await word.$$(".results__tags > a");
    await expect(tags).toHaveLength(1);

    const tag = tags[0];
    const tagName = await tag.$(".tag > span");

    expect(await tagName.innerText()).toBe("聖遺物（個別名）");
    expect(await tag.getAttribute("href")).toBe("/tags/artifact-piece/");

    // error message is NOT shown
    expect(await page.$("p[data-e2e='empty']")).toBeNull();

    return;
  });

  test("search by English", async ({ page }) => {
    await page.goto(rootURL);
    const searchBox = await page.$("input[name='searchbox']");
    await searchBox.fill("Dull Blade");

    await page.waitForTimeout(1400); // Wait for the search results to be shown

    const words = await page.$$(".results__word");
    await expect(words).toHaveLength(1);

    const word = words[0];
    const ja = await word.$("span[data-e2e='ja']");
    const en = await word.$("*[data-e2e='en']");
    const pronunciationJa = await word.$(".results__pronunciation-ja");

    expect(await ja.innerText()).toBe("無鋒の剣");
    expect(await en.innerText()).toBe("Dull Blade");
    expect(await pronunciationJa.innerText()).toBe("(むほうのけん)");

    const tags = await word.$$(".results__tags > a");
    await expect(tags).toHaveLength(2);

    // error message is NOT shown
    expect(await page.$("p[data-e2e='empty']")).toBeNull();

    return;
  });

  test("search by Chinese", async ({ page }) => {
    await page.goto(rootURL);
    const searchBox = await page.$("input[name='searchbox']");
    await searchBox.fill("炽烈的炎之魔女");

    await page.waitForTimeout(1400); // Wait for the search results to be shown

    const words = await page.$$(".results__word");
    await expect(words).toHaveLength(1);

    const word = words[0];
    const ja = await word.$("span[data-e2e='ja']");
    const en = await word.$("*[data-e2e='en']");
    const zhCN = await word.$("*[data-e2e='zh-CN']");
    const pronunciationJa = await word.$(".results__pronunciation-ja");

    expect(await ja.innerText()).toBe("燃え盛る炎の魔女");
    expect(await en.innerText()).toBe("Crimson Witch of Flames");
    expect(await zhCN.innerText()).toBe("炽烈的炎之魔女");
    expect(await pronunciationJa.innerText()).toBe("(もえさかるほのおのまじょ)");

    const tags = await word.$$(".results__tags > a");
    await expect(tags).toHaveLength(1);

    // error message is NOT shown
    expect(await page.$("p[data-e2e='empty']")).toBeNull();

    return;
  });

  test("searching inexistent word", async ({ page }) => {
    await page.goto(rootURL);
    const searchBox = await page.$("input[name='searchbox']");
    await searchBox.fill("存在しない語彙");

    await page.waitForTimeout(1400); // Wait for the search results to be shown

    const words = await page.$$(".results__word");
    await expect(words).toHaveLength(0);

    // Check if searchbox is not disappeared
    const searchBox2 = await page.$("input[name='searchbox']");
    await expect(searchBox2).not.toBeNull();
    // search text is not deleted
    await expect(await searchBox2.inputValue()).toBe("存在しない語彙");

    // error message is shown
    expect((await page.textContent("p[data-e2e='empty']")).trim()).toBe("該当する語彙が見つかりませんでした。");

    return;
  });

  test("infinite load", async ({ page }) => {
    await page.goto(rootURL);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await page.waitForTimeout(1400); // Wait for additional words loaded

    const words = await page.$$(".results__word");
    expect(words.length).toBeGreaterThan(101);

    return;
  });

  test("title", async ({ page }) => {
    await page.goto(`${rootURL}/lumine/`);

    expect(await page.title()).toBe("「蛍」は英語で \"Lumine\" | 原神 英語・中国語辞典");

    return;
  });

  test("search by tag", async ({ page }) => {
    await page.goto(rootURL);

    const mobileTagBoxToggle = page.locator(".search__taglist-icon");

    if (await mobileTagBoxToggle.isVisible() === true) {
      await mobileTagBoxToggle.tap();
    }

    const firstTag = page.locator(".search__tag").first();
    const selectedTagName = (await firstTag.innerText()).replace("+", "").trim();

    await firstTag.click();
    await page.waitForTimeout(1400); // Wait for words loaded

    const words = await page.locator(".results__word");

    for (let i = 0; i < await words.count(); i++) {
      const tagEls = await (words.nth(i)).locator(".results__tags > a");
      const resultTagNames = (await tagEls.allInnerTexts()).map(resultTagName => resultTagName.trim());

      expect(resultTagNames).toContain(selectedTagName);
    }

    return;
  });

  test("open tag list", async ({ page }) => {
    await page.goto(rootURL);

    // Do not run test on Desktop
    if (840 < await page.evaluate(() => window.innerWidth)) {
      return;
    }

    await page.locator(".search__taglist-icon").click();
    await page.waitForTimeout(800);
    expect(await page.locator(".search__taglist").isVisible()).toBe(true);

    return;
  });
});

