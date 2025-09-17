import { test, expect } from "@playwright/test";
import { fetch } from "undici";
import type { Locale } from "../app/utils/types.ts";

const { describe } = test;

const ip = "127.0.0.1";
const port = 5678;

function getRandomLang(): Locale {
  const random = Math.floor(Math.random() * 4);

  if (random === 0) {
    return "en";
  } else if (random === 1) {
    return "ja";
  } else if (random === 2) {
    return "zh-CN";
  } else { // if (3 <= random)
    return "zh-TW";
  }
}

describe("The Genshin English Dictionary", () => {
  const lang = getRandomLang();
  const rootURL = `http://${ ip }:${ port }/${ lang }`;

  console.log(`Testing in ${ lang } locale.`);

  test("search by English", async ({ page }) => {
    await page.goto(rootURL);
    await page.waitForTimeout(1400); // Wait for page initialization process

    const searchBox = await page.$("input[name='searchbox']");
    await searchBox!.fill("Dull Blade");

    await page.waitForTimeout(1400); // Wait for the search results to be shown

    const words = await page.$$(".results__word");
    expect(words).toHaveLength(1);

    const word = words[0];
    const ja = await word.$("span[data-e2e='ja']");
    const en = await word.$("*[data-e2e='en']");
    const pronunciationJa = await word.$(".results__pronunciation-ja");

    expect(await ja!.innerText()).toBe("無鋒の剣");
    expect(await en!.innerText()).toBe("Dull Blade");
    expect(await pronunciationJa!.innerText()).toBe("(むほうのけん)");

    const tags = await word.$$(".results__tags > a");
    expect(tags).toHaveLength(2);

    // error message is NOT shown
    expect(await page.$("p[data-e2e='empty']")).toBeNull();

    return;
  });

  test("search by Chinese", async ({ page }) => {
    await page.goto(rootURL);
    await page.waitForTimeout(1400); // Wait for page initialization process

    const searchBox = await page.$("input[name='searchbox']");
    await searchBox!.fill("炽烈的炎之魔女");

    await page.waitForTimeout(1400); // Wait for the search results to be shown

    const words = await page.$$(".results__word");
    expect(words).toHaveLength(1);

    const word = words[0];
    const ja = await word.$("span[data-e2e='ja']");
    const en = await word.$("*[data-e2e='en']");
    const zhCN = await word.$("*[data-e2e='zh-CN']");
    const zhTW = await word.$("*[data-e2e='zh-TW']");
    const pronunciationJa = await word.$(".results__pronunciation-ja");

    expect(await ja!.innerText()).toBe("燃え盛る炎の魔女");
    expect(await en!.innerText()).toBe("Crimson Witch of Flames");
    expect(await zhCN!.innerText()).toBe("炽烈的炎之魔女");
    expect(await zhTW!.innerText()).toBe("熾烈的炎之魔女");
    expect(await pronunciationJa!.innerText()).toBe("(もえさかるほのおのまじょ)");

    const tags = await word.$$(".results__tags > a");
    expect(tags).toHaveLength(1);

    // error message is NOT shown
    expect(await page.$("p[data-e2e='empty']")).toBeNull();

    return;
  });

  test("infinite load", async ({ page }) => {
    await page.goto(rootURL);

    // Without this, window.scrollTo() runs before Nuxt finishes all the page load process.
    // When Nuxt finishes the page load process, Nuxt seems to reset scroll position to the top.
    await page.waitForTimeout(1400);

    // @ts-expect-error - You don't have to declare window and document object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await page.waitForTimeout(1400); // Wait for additional words loaded

    const words = await page.$$(".results__word");
    expect(words.length).toBe(200);

    return;
  });

  test("search by tag", async ({ page }) => {
    await page.goto(rootURL);
    await page.waitForTimeout(1400); // Wait for page initialization process

    const mobileTagBoxToggle = page.locator(".search__taglist-icon");

    if (await mobileTagBoxToggle.isVisible() === true) {
      await mobileTagBoxToggle.tap();
    }

    const firstTag = page.locator(".search__tag").first();
    const selectedTagName = (await firstTag.innerText()).replace("+", "").trim();

    await firstTag.click();
    await page.waitForTimeout(1400); // Wait for words loaded

    const words = page.locator(".results__word");

    for (let i = 0; i < await words.count(); i++) {
      const tagEls = words.nth(i).locator(".results__tags > a");
      const resultTagNames = (await tagEls.allInnerTexts()).map((resultTagName) => resultTagName.trim());

      expect(resultTagNames).toContain(selectedTagName);
    }

    return;
  });

  test("open tag list", async ({ page }) => {
    await page.goto(rootURL);
    await page.waitForTimeout(1400); // Wait for page initialization process

    // @ts-expect-error - You don't have to declare window and document object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    if (840 < await page.evaluate(() => window.innerWidth)) { // Do not run test on Desktop
      return;
    }

    await page.locator(".search__taglist-icon").click();
    await page.waitForTimeout(800);
    expect(await page.locator(".search__taglist").isVisible()).toBe(true);

    return;
  });

  test("pinyin is properly displayed on Chinese", async ({ page }) => {
    await page.goto(`http://${ ip }:${ port }/zh-CN/pearl-galley`);

    const chinese = await page.$("[data-e2e='zh-CN']");
    expect(await chinese!.innerHTML()).toBe("珠<ruby>钿<rp>(</rp><rt class=\"results__pinyin\">diàn</rt><rp>)</rp></ruby><ruby>舫<rp>(</rp><rt class=\"results__pinyin\">fǎng</rt><rp>)</rp></ruby>");

    return;
  });

  for (const lang of [ "en", "ja", "zh-CN", "zh-TW" ]) {
    const rootURL = `http://${ ip }:${ port }/${ lang }`;

    test(`search by Japanese (${ lang })`, async ({ page }) => {
      await page.goto(rootURL);
      await page.waitForTimeout(1400); // Wait for page initialization process

      const searchBox = await page.$("input[name='searchbox']");
      await searchBox!.fill("狂戦士の仮面");

      await page.waitForTimeout(1400); // Wait for the search results to be shown

      const words = await page.$$(".results__word");
      expect(words).toHaveLength(1);

      const word = words[0];
      const ja = await word.$("span[data-e2e='ja']");
      const en = await word.$("*[data-e2e='en']");
      const pronunciationJa = await word.$(".results__pronunciation-ja");
      const permalink = await word.$(".results__permalink > a");

      expect(await ja!.innerText()).toBe("狂戦士の仮面");
      expect(await en!.innerText()).toBe("Berserker's Battle Mask");
      expect(await pronunciationJa!.innerText()).toBe("(きょうせんしのかめん)");
      expect(await permalink!.getAttribute("href")).toBe(`/${ lang }/berserkers-battle-mask`);

      if (lang === "ja") {
        const notes = await word.$("div[data-e2e='notes']");
        expect(await notes!.innerText()).toBe("聖遺物セット「狂戦士」(Berserker) の1つ");
      }

      const tags = await word.$$(".results__tags > a");
      expect(tags).toHaveLength(1);

      const tag = tags[0];
      const tagName = await tag.$(".tag > span");

      if (lang === "en") {
        expect(await tagName!.innerText()).toBe("A Piece of Artifacts");
      } else if (lang === "ja") {
        expect(await tagName!.innerText()).toBe("聖遺物（個別名）");
      } else if (lang === "zh-CN") {
        expect(await tagName!.innerText()).toBe("圣遗物（单件名）");
      } else if (lang === "zh-TW") {
        expect(await tagName!.innerText()).toBe("聖遺物（單件名）");
      }

      expect(await tag.getAttribute("href")).toBe(`/${ lang }/tags/artifact-piece`);

      // error message is NOT shown
      expect(await page.$("p[data-e2e='empty']")).toBeNull();

      return;
    });

    test(`if note is shown by the specified language (${ lang })`, async ({ page }) => {
      await page.goto(`${ rootURL }/rosalyne-kruzchka-lohefalter`);

      const words = await page.$$(".results__word");
      const word = words[0];

      if (lang === "ja") {
        const notes = await word.$("div[data-e2e='notes']");
        expect(await notes!.innerText()).toBe("淑女の本名");
        expect(await word.$("div[data-e2e='notesEn']")).toBeNull();
        expect(await word.$("div[data-e2e='notesZh']")).toBeNull();
        expect(await word.$("div[data-e2e='notesZhTW']")).toBeNull();
      } else if (lang === "zh-CN") {
        const notesZh = await word.$("div[data-e2e='notesZh']");
        expect(await notesZh!.innerText()).toBe("「女士」的本名。");
        expect(await word.$("div[data-e2e='notes']")).toBeNull();
        expect(await word.$("div[data-e2e='notesEn']")).toBeNull();
        expect(await word.$("div[data-e2e='notesZhTW']")).toBeNull();
      } else if (lang === "zh-TW") {
        const notesZhTW = await word.$("div[data-e2e='notesZhTW']");
        expect(await notesZhTW!.innerText()).toBe("「女士」的本名。");
        expect(await word.$("div[data-e2e='notes']")).toBeNull();
        expect(await word.$("div[data-e2e='notesEn']")).toBeNull();
        expect(await word.$("div[data-e2e='notesZh']")).toBeNull();
      } else { // if (lang === "en")
        const notesEn = await word.$("div[data-e2e='notesEn']");
        expect(await notesEn!.innerText()).toBe("La Signora's real name.");
        expect(await word.$("div[data-e2e='notes']")).toBeNull();
        expect(await word.$("div[data-e2e='notesZh']")).toBeNull();
        expect(await word.$("div[data-e2e='notesZhTW']")).toBeNull();
      }
    });

    test(`searching inexistent word (${ lang })`, async ({ page }) => {
      await page.goto(rootURL);
      await page.waitForTimeout(1400); // Wait for page initialization process

      const searchBox = await page.$("input[name='searchbox']");
      await searchBox!.fill("存在しない語彙");

      await page.waitForTimeout(1400); // Wait for the search results to be shown

      const words = await page.$$(".results__word");
      expect(words).toHaveLength(0);

      // Check if searchbox is not disappeared
      const searchBox2 = await page.$("input[name='searchbox']");
      expect(searchBox2).not.toBeNull();
      // search text is not deleted
      expect(await searchBox2!.inputValue()).toBe("存在しない語彙");

      // error message is shown
      const notFoundMessage = (await page.textContent("p[data-e2e='empty']"))!.trim();

      if (lang === "en") {
        expect(notFoundMessage).toBe("Your search did not match any words in this dictionary.");
      } else if (lang === "ja") {
        expect(notFoundMessage).toBe("該当する語彙が見つかりませんでした。");
      } else if (lang === "zh-CN") {
        expect(notFoundMessage).toBe("未找到匹配的词汇。");
      } else if (lang === "zh-TW") {
        expect(notFoundMessage).toBe("未找到符合的詞彙。");
      }

      return;
    });

    test(`title for words page (${ lang })`, async ({ page }) => {
      await page.goto(`${ rootURL }/lumine`);

      if (lang === "en") {
        await expect(page.title()).resolves.toBe("\"Lumine\" is \"荧\" in Chinese | Genshin Dictionary");
      } else if (lang === "ja") {
        await expect(page.title()).resolves.toBe("「蛍」は英語で \"Lumine\" | 原神 英語・中国語辞典");
      } else if (lang === "zh-CN") {
        await expect(page.title()).resolves.toBe("\"荧\"的英语和日语翻译 | 原神中英日辞典");
      } else if (lang === "zh-TW") {
        await expect(page.title()).resolves.toBe("\"熒\"的英語和日語翻譯 | 原神中英日辭典");
      }

      return;
    });

    test(`title for tag page (${ lang })`, async ({ page }) => {
      await page.goto(`${ rootURL }/tags/liyue`);

      if (lang === "en") {
        expect(await page.title()).toBe("Chinese & Japanese translations for words related to Liyue | Genshin Dictionary");
      } else if (lang === "ja") {
        expect(await page.title()).toBe("璃月に関する言葉の英語・中国語表記一覧 | 原神 英語・中国語辞典");
      } else if (lang === "zh-CN") {
        expect(await page.title()).toBe("关于璃月的词语的英语和日语翻译 | 原神中英日辞典");
      } else if (lang === "zh-TW") {
        expect(await page.title()).toBe("關於璃月的詞語的英語和日語翻譯 | 原神中英日辭典");
      }

      return;
    });
  }
});

describe("redirection by language settings works properly", () => {
  const rootURL = `http://${ ip }:${ port }`;
  const langs = [
    { code: "ja", localeDir: "ja" },
    { code: "ja-JP", localeDir: "ja" },
    { code: "en", localeDir: "en" },
    { code: "en-US", localeDir: "en" },
    { code: "en-GB", localeDir: "en" },
    { code: "zh", localeDir: "zh-CN" },
    { code: "zh-CN", localeDir: "zh-CN" },
    { code: "zh-TW", localeDir: "zh-TW" },
    { code: "fr", localeDir: "en" }, // fallback to English
  ];

  for (const { code, localeDir } of langs) {
    test(`/ (${ code })`, async () => {
      const res = await fetch(`${ rootURL }/locale-redirect?path=%2F`, { // `%2F` === `/`
        headers: {
          "Accept-Language": code,
        },
      });

      expect(res.redirected).toBe(true);
      expect(res.url).toBe(`${ rootURL }/${ localeDir }`);
    });

    test(`/[wordid] (${ code })`, async () => {
      const res = await fetch(`${ rootURL }/locale-redirect?path=%2Flumine`, { // `%2F` === `/`
        headers: {
          "Accept-Language": code,
        },
      });

      expect(res.redirected).toBe(true);
      expect(res.url).toBe(`${ rootURL }/${ localeDir }/lumine`);
    });
  }
});

// TODO The redirections by public/_headers file are only work on production.

// describe("redirection", () => {
//   const rootURL = `http://localhost:${port}`;
//
//   test("redirection from old word ID works properly", async () => {
//     const srcURL = `${rootURL}/ja/barbara`;
//     const destURL = "/ja/barbara-pegg";
//
//     const res = await fetch(srcURL, {
//       redirect: "manual",
//     });
//
//     ok(res.status === 301 || res.status === 308);
//     expect(res.headers.get("Location")).toBe(destURL);
//   });
//
//   test("redirection to strip slash", async () => {
//     const srcURL = `${rootURL}/ja/barbara-pegg/`;
//     const destURL = "/ja/barbara-pegg";
//
//     const res = await fetch(srcURL, {
//       redirect: "manual",
//     });
//
//     ok(res.status === 301 || res.status === 308);
//     expect(res.headers.get("Location")).toBe(destURL);
//   });
// });
