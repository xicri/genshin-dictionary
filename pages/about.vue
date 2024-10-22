<template>
  <div class="article__wrapper-outer">
    <div class="article__wrapper-inner">
      <h2>{{ $t("aboutTitle") }}</h2>

      <main>
        <p v-html="aboutIntroText"></p>
        <p>{{ $t("wordCount", { count: wordCount }) }}</p>

        <h3>{{ $t("precautionsTitle") }}</h3>
        <p>{{ $t("precautions1") }}</p>
        <p v-html="precautions2Text"></p>
        <p>{{ $t("precautions3") }}</p>

        <h3>{{ $t("openDataTitle") }}</h3>
        <p v-html="openDataContentText"></p>

        <h3>{{ $t("operatorTitle") }}</h3>
        <ul>
          <li v-html="operatorText"></li>
          <li v-html="contributorText"></li>
        </ul>

        <p v-html="contactText"></p>

        <h3>{{ $t("creditsTitle") }}</h3>
        <p v-html="credits1Text"></p>
        <p v-html="credits2Text"></p>
        <p v-html="credits3Text"></p>
        <p v-html="credits4Text"></p>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import words from "~/dataset/words.json";
import type { Locale } from "~/types.ts";

const { locale, t } = useI18n<[], Locale>();
const title = `${t("aboutTitle")} | ${t("siteTitle")}`;
const description = t("aboutDescription");

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
    { hid: "description", name: "description", content: description },
    { hid: "og:description", property: "og:description", content: description }
  ],
});

const wordCount = words.length;

const createLink = (url: string, text: string) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;

const aboutIntroText = computed(() => {
  const genshinLink = createLink("https://genshin.hoyoverse.com", t("genshinImpact"));
  return t("aboutIntro", { genshinLink });
});

const precautions2Text = computed(() => {
  const genshinDictionaryLink = createLink("http://anemoarchon.s205.xrea.com/#/gdic", t("genshinDictionary"));
  return t("precautions2", { genshinDictionaryLink });
});

const openDataContentText = computed(() => {
  const openDataLink = createLink("./opendata", t("openDataPageLink"));
  return t("openDataContent", { openDataLink });
});

const operatorText = computed(() => {
  const twitterLink = createLink("https://twitter.com/xicri_gi", "Twitter");
  const githubLink = createLink("https://github.com/xicri", "GitHub");
  return t("operator", { twitterLink, githubLink });
});

const contributorText = computed(() => {
  const bilibiliLink = createLink("https://space.bilibili.com/158463764", "BiliBili");
  const twitterLink = createLink("https://twitter.com/Haku_Bill", "Twitter");
  const githubLink = createLink("https://github.com/Bill-Haku", "GitHub");
  return t("contributor", { bilibiliLink, twitterLink, githubLink });
});

const contactText = computed(() => {
  const twitterLink = createLink("https://twitter.com/xicri_gi", "Twitter");
  const issuesLink = createLink("https://github.com/xicri/genshin-dictionary/issues", "Issues");
  const discussionsLink = createLink("https://github.com/xicri/genshin-dictionary/discussions", "Discussions");
  return t("contact", { twitterLink, issuesLink, discussionsLink });
});

const credits1Text = computed(() => {
  const genshinDictionaryLink = createLink("http://anemoarchon.s205.xrea.com/#/gdic", t("genshinDictionary"));
  const genshinKanjiLabLink = createLink("https://twitter.com/genshin_kanji", t("genshinKanjiLab"));
  return t("credits1", { genshinDictionaryLink, genshinKanjiLabLink });
});

const credits2Text = computed(() => {
  const genshinWikiLink = createLink("https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki", "Genshin Impact Wiki (Fandom)");
  return t("credits2", { genshinWikiLink });
});

const credits3Text = computed(() => {
  const octiconsLink = createLink("https://primer.style/octicons/", "Octicons");
  const licenseLink = createLink("https://github.com/primer/octicons/blob/main/LICENSE", `MIT ${t("license")}`);
  return t("credits3", { octiconsLink, licenseLink });
});

const credits4Text = computed(() => {
  const logoTypeGothicLink = createLink("http://www.fontna.com/blog/1226/", t("logoTypeGothic"));
  return t("credits4", { logoTypeGothicLink });
});
</script>

<style lang="scss" src="~/assets/styles/articles.scss" scoped></style>