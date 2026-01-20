<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime";
  import Article from "$lib/components/Article.svelte";
  import words from "$lib/dataset/words.json";
  import "$lib/styles/articles.css";

  const locale = getLocale();
  const title = `${ m.aboutTitle() } | ${ m.siteTitle() }`;
  const description = m.aboutDescription();

  const wordCount = words.length;
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
</svelte:head>

<Article>
  <h2>{ m.aboutTitle() }</h2>

  <main>
    <p>
      {m.aboutIntro1()}<a href={locale === "zh-CN" ? "https://ys.mihoyo.com" : "https://genshin.hoyoverse.com"} target="_blank" rel="noopener">{m.genshinImpact()}</a>{m.aboutIntro2()}
    </p>
    <p>{ m.wordCount({ count: wordCount }) }</p>

    <h3>{ m.precautionsTitle() }</h3>
    <p>{ m.precautions1() }</p>
    {#if locale === "ja"}
      <p>
        読み仮名は検索精度の向上を目的として付けており、その正確性について十分な調査をしておりません。間違いが多く含まれる可能性があることをご了承下さい。
      </p>
    {/if}
    <p>{ m.precautions2() }</p>

    <h3>{ m.contact() }</h3>
    <p>
      {m.contactInstruction()}
    </p>
    <ul>
      <li>
        <a href="https://bsky.app/profile/xicri.genshin-dictionary.com" target="_blank" rel="noopener">
          Bluesky
        </a> ({m.contactBlueskyChatAvailable()})
      </li>
      <li>
        <a href="https://github.com/xicri/genshin-dictionary/issues" target="_blank" rel="noopener">
          GitHub Issues
        </a> ({m.contactGHIssuesFor()})
      </li>
      <li>
        <a href="https://github.com/xicri/genshin-dictionary/discussions" target="_blank" rel="noopener">
          GitHub Discussions
        </a> ({m.contactGHDiscussionsFor()})
      </li>
    </ul>

    <h3>{ m.creditsTitle() }</h3>
    <p>
      {m.creditsContributorsIntro()}
    </p>
    <ul>
      <li>
        <a href="https://github.com/xicri/genshin-dictionary/graphs/contributors" target="_blank" rel="noopener">
          {m.creditsContributorsWebsite()}
        </a>
      </li>
      <li>
        <a href="https://github.com/xicri/genshin-langdata/graphs/contributors" target="_blank" rel="noopener">
          {m.creditsContributorsWordData()}
        </a>
      </li>
    </ul>

    <p>
      {m.creditsResourcesIntro()}
    </p>

    <ul>
      <li>
        <a href="https://primer.style/octicons/" target="_blank" rel="noopener">
          Octicons
        </a> ({m.creditsOcticonsLicensing()})
      </li>
      <li>
        <a href="https://www.fontna.com/blog/1226/" target="_blank" rel="noopener">
          {m.logoTypeGothic()}
        </a> ({m.creditsLogoTypeGothicLicensing()})
      </li>
    </ul>
  </main>
</Article>
