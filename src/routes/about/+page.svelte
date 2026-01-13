<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime";
  import words from "../../../dataset/words.json";

  const locale = getLocale();
  const title = `${ m.aboutTitle() } | ${ m.siteTitle() }`;
  const description = m.aboutDescription();

  const wordCount = words.length;

  const createLink = (url: string, text: string) => `<a href="${ url }" target="_blank" rel="noopener">${ text }</a>`;

  const blueskyLink = createLink("https://bsky.app/profile/xicri.genshin-dictionary.com", "Bluesky");
  const githubLink = createLink("https://github.com/xicri", "GitHub");
  const issuesLink = createLink("https://github.com/xicri/genshin-dictionary/issues", "Issues");
  const discussionsLink = createLink("https://github.com/xicri/genshin-dictionary/discussions", "Discussions");

  const aboutIntroText = m.aboutIntro({
    genshinLink: createLink(
      locale === "zh-CN" ? "https://ys.mihoyo.com" : "https://genshin.hoyoverse.com",
      m.genshinImpact(),
    ),
  });

  const contributorText = m.contributor({
    bilibiliLink: createLink("https://space.bilibili.com/158463764", "BiliBili"),
    twitterLink: createLink("https://x.com/Haku_Bill", "X (Twitter)"),
    githubLink: createLink("https://github.com/Bill-Haku", "GitHub"),
  });

  const contactText = [
    m.contact1({ blueskyLink }),
    m.contact2({ issuesLink, discussionsLink }),
    m.contact3(),
  ].join("<br />");

  const credits1Text = m.credits1({
    genshinDictionaryLink: createLink("http://anemoarchon.s205.xrea.com/#/gdic", m.genshinDictionary()),
    genshinKanjiLabLink: createLink("https://x.com/genshin_kanji", m.genshinKanjiLab()),
  });
  const credits2Text = m.credits2({
    genshinWikiLink: createLink("https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki", "Genshin Impact Wiki (Fandom)"),
  });
  const credits3Text = m.credits3({
    octiconsLink: createLink("https://primer.style/octicons/", "Octicons"),
    licenseLink: createLink("https://github.com/primer/octicons/blob/main/LICENSE", `MIT ${ m.license() }`),
  });
  const credits4Text = m.credits4({
    logoTypeGothicLink: createLink("http://www.fontna.com/blog/1226/", m.logoTypeGothic()),
  });
</script>

<style lang="scss" src="~/assets/styles/articles.scss"></style>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
</svelte:head>

<div class="article__wrapper-outer">
  <div class="article__wrapper-inner">
    <h2>{ m.aboutTitle() }</h2>

    <main>
      <p>{@html aboutIntroText}</p>
      <p>{ m.wordCount({ count: wordCount }) }</p>

      <h3>{ m.precautionsTitle() }</h3>
      <p>{ m.precautions1() }</p>
      {#if locale === "ja"}
        <p>
          読み仮名は検索精度の向上を目的として付けており、その正確性について十分な調査をしておりません。間違いが多く含まれる可能性があることをご了承下さい。
        </p>
      {/if}
      <p>{ m.precautions2() }</p>

      <h3>{ m.operatorTitle() }</h3>
      <ul>
        <li>{@html m.operator({ blueskyLink, githubLink })}</li>
        <li>{@html contributorText}</li>
      </ul>

      <p>{@html contactText}</p>

      <h3>{ m.creditsTitle() }</h3>
      <p>{@html credits1Text}</p>
      <p>{@html credits2Text}</p>
      <p>{@html credits3Text}</p>
      <p>{@html credits4Text}</p>
    </main>
  </div>
</div>
