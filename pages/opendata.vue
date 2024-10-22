<template>
  <div class="article__wrapper-outer">
    <div class="article__wrapper-inner">
      <h2>{{ $t("opendataTitle") }}</h2>

      <main>
        <p>{{ $t("introText") }}</p>

        <h3>{{ $t("csvTitle") }}</h3>
        <ul>
          <li>
            <a href="https://dataset.genshin-dictionary.com/words.csv" target="_blank">
              {{ $t("csvDownloadUtf8") }}
            </a>
          </li>
          <li>
            <a href="https://dataset.genshin-dictionary.com/words-sjis.csv" target="_blank">
              {{ $t("csvDownloadShiftJis") }}
            </a>
          </li>
        </ul>
        <p>{{ $t("csvNote") }}</p>

        <h3>{{ $t("jsonTitle") }}</h3>

        <h4>{{ $t("jsonUrlTitle") }}</h4>
        <p v-html="downloadLink"></p>

        <h4>{{ $t("jsonFormatTitle") }}</h4>
        <p>{{ $t("jsonFormatText") }}</p>
        <code>
          <pre>{{ jsonExample }}</pre>
        </code>

        <p>{{ $t("propertyTitle") }}</p>
        <ul>
          <li><code>id</code> ― {{ $t("propertyId") }}</li>
          <li><code>en</code> ― {{ $t("propertyEn") }}</li>
          <li><code>ja</code> ― {{ $t("propertyJa") }}</li>
          <li><code>zhCN</code> ― {{ $t("propertyZhCN") }}</li>
          <li><code>pronunciationJa</code> ― {{ $t("propertyPronunciationJa") }}</li>
          <li><code>notes</code> ― {{ $t("propertyNotes") }}</li>
          <li><code>notesZh</code> ― {{ $t("propertyNotesZh") }}</li>
          <li><code>variants</code> ― {{ $t("propertyVariants") }}</li>
          <li><code>variants.en</code> ― {{ $t("propertyVariantsEn") }}</li>
          <li><code>variants.ja</code> ― {{ $t("propertyVariantsJa") }}</li>
          <li><code>examples</code> ― {{ $t("propertyExamples") }}</li>
          <li><code>examples[].en</code> ― {{ $t("propertyExamplesEn") }}</li>
          <li><code>examples[].ja</code> ― {{ $t("propertyExamplesJa") }}</li>
          <li><code>examples[].ref</code> ― {{ $t("propertyExamplesRef") }}</li>
          <li><code>examples[].refURL</code> ― {{ $t("propertyExamplesRefURL") }}</li>
          <li><code>createdAt</code> ― {{ $t("propertyCreatedAt") }}</li>
          <li><code>updatedAt</code> ― {{ $t("propertyUpdatedAt") }}</li>
          <li>
            <code>tags</code> ― {{ $t("propertyTags") }}
            <ul>
              <li v-for="[ tagID, tag ] in Object.entries(tags)" :key="tagID">
                <code>{{ tagID }}</code> ― {{ tag[locale as Locale] }}
              </li>
            </ul>
          </li>
        </ul>

        <h4>{{ $t("compatibilityTitle") }}</h4>
        <p>{{ $t("compatibilityText") }}</p>

        <h3>{{ $t("usageNotesTitle") }}</h3>
        <p>{{ $t("lastUpdated") }}</p>
        <ul class="usage-notes">
          <li>{{ $t("usageNotes.basic") }}</li>
          <li>{{ $t("usageNotes.citation") }}</li>
          <li>
            {{ $t("usageNotes.revocation.intro") }}
            <ul>
              <li>{{ $t("usageNotes.revocation.rights") }}</li>
              <li>{{ $t("usageNotes.revocation.terms") }}</li>
              <li>{{ $t("usageNotes.revocation.laws") }}</li>
              <li>{{ $t("usageNotes.revocation.request") }}</li>
            </ul>
          </li>
          <li>{{ $t("usageNotes.disclaimer") }}</li>
        </ul>
        <p v-html="contactText"></p>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import tags from "~/dataset/tags.json";
import type { Locale } from "~/types.ts";

const { locale, t } = useI18n<[], Locale>();
const title = `${t("opendataTitle")} | ${t("siteTitle")}`;

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
    ...(locale.value !== "ja" ? [{
      hid: "noindex",
      name: "robots",
      content: "noindex",
    }] : []),
  ],
});

const jsonExample = `[
  {
    "id": "zhongli",
    "en": "Zhongli",
    "ja": "鍾離",
    "zhCN": "钟离",
    "pronunciationJa": "しょうり",
    "notes": "読みは「ヂョンリー」",
    "notesZh": "锺离是中国古代早已有之的一个汉字复姓。…",
    "variants": {
      "ja": [ "鐘離" ]
    },
    "createdAt": "2022-01-01",
    "updatedAt": "2022-01-01",
    "tags": [ "liyue", "character-main" ]
  },
  {
    "id": "inazuman",
    "en": "Inazuman",
    "ja": "稲妻人 / 稲妻の",
    "zhCN": "稻妻人 / 稻妻的",
    "pronunciationJa": "いなずまじん",
    "notes": "元々 Inazuman は非公式にプレイヤーの間で使われる言葉であったが…(以下略)",
    "examples": [{
      "en": "Inazumans are definitely more particular about etiquette than Mondstadters!",
      "ja": "モンド人よりも、稲妻人の方が礼儀に対して気を配っている。",
      "ref": "トーマ, キャラクター実戦紹介 トーマ「烈炎の守護」",
      "refURL": "https://www.youtube.com/watch?v=jvmz4TrPgUE&t=16s"
    }],
    "createdAt": "2022-01-01",
    "updatedAt": "2022-01-01",
    "tags": [ "inazuma" ]
  }
]`;

const downloadLink = computed(() => {
  const dlLink = '<a href="https://dataset.genshin-dictionary.com/words.json" target="_blank" rel="noopener">https://dataset.genshin-dictionary.com/words.json</a>';
  return t("jsonUrlText", { url: dlLink });
});

const contactText = computed(() => {
  const twitterLink = '<a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a>';
  return t("contactText", { twitterLink });
});
</script>

<style lang="scss" src="~/assets/styles/articles.scss" scoped></style>