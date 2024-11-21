<template>
  <div class="article__wrapper-outer">
    <div class="article__wrapper-inner">
      <h2>{{ t("opendataTitle") }}</h2>

      <main>
        <p>{{ t("introText") }}</p>

        <h3>{{ t("csvTitle") }}</h3>
        <ul>
          <li>
            <a href="https://dataset.genshin-dictionary.com/words.csv" target="_blank">
              {{ t("csvDownloadUtf8") }}
            </a>
          </li>
          <li>
            <a href="https://dataset.genshin-dictionary.com/words-sjis.csv" target="_blank">
              {{ t("csvDownloadShiftJis") }}
            </a>
          </li>
        </ul>
        <p v-if="locale === 'ja'">
          Excel を用いて CSV を開く場合は、Shift_JIS 版の利用を推奨します。UTF-8 版を用いると文字化けする可能性があります。<br />
          その他のソフトウェアを用いる場合についても、文字化けが発生する場合は UTF-8 版と Shift_JIS 版の両方を試してみて下さい。
        </p>

        <h3>{{ t("jsonTitle") }}</h3>

        <h4>{{ t("jsonUrlTitle") }}</h4>
        <p v-html="downloadLink"></p>

        <h4>{{ t("jsonFormatTitle") }}</h4>
        <p>{{ t("jsonFormatText") }}</p>
        <code>
          <pre>{{ jsonExample }}</pre>
        </code>

        <p>{{ t("propertyTitle") }}</p>
        <ul>
          <li><code>id</code> ― {{ t("propertyId") }}</li>
          <li><code>en</code> ― {{ t("propertyEn") }}</li>
          <li><code>ja</code> ― {{ t("propertyJa") }}</li>
          <li><code>zhCN</code> ― {{ t("propertyZhCN") }}</li>
          <li><code>pronunciationJa</code> ― {{ t("propertyPronunciationJa") }}</li>
          <li><code>notes</code> ― {{ t("propertyNotes") }}</li>
          <li><code>notesZh</code> ― {{ t("propertyNotesZh") }}</li>
          <li><code>variants</code> ― {{ t("propertyVariants") }}</li>
          <li><code>variants.en</code> ― {{ t("propertyVariantsEn") }}</li>
          <li><code>variants.ja</code> ― {{ t("propertyVariantsJa") }}</li>
          <li><code>examples</code> ― {{ t("propertyExamples") }}</li>
          <li><code>examples[].en</code> ― {{ t("propertyExamplesEn") }}</li>
          <li><code>examples[].ja</code> ― {{ t("propertyExamplesJa") }}</li>
          <li><code>examples[].ref</code> ― {{ t("propertyExamplesRef") }}</li>
          <li><code>examples[].refURL</code> ― {{ t("propertyExamplesRefURL") }}</li>
          <li><code>createdAt</code> ― {{ t("propertyCreatedAt") }}</li>
          <li><code>updatedAt</code> ― {{ t("propertyUpdatedAt") }}</li>
          <li>
            <code>tags</code> ― {{ t("propertyTags") }}
            <ul>
              <li v-for="[ tagID, tag ] in Object.entries(tags)" :key="tagID">
                <code>{{ tagID }}</code> ― {{ tag[locale as Locale] }}
              </li>
            </ul>
          </li>
        </ul>

        <h4>{{ t("compatibilityTitle") }}</h4>
        <p>{{ t("compatibilityText") }}</p>

        <h3>{{ t("usageNotesTitle") }}</h3>
        <p>{{ t("lastUpdated") }}</p>
        <ul class="usage-notes">
          <li>{{ t("usageNotes.basic") }}</li>
          <li>{{ t("usageNotes.citation") }}</li>
          <li>
            {{ t("usageNotes.revocation.intro") }}
            <ul>
              <li>{{ t("usageNotes.revocation.rights") }}</li>
              <li>{{ t("usageNotes.revocation.terms") }}</li>
              <li>{{ t("usageNotes.revocation.laws") }}</li>
              <li>{{ t("usageNotes.revocation.request") }}</li>
            </ul>
          </li>
          <li>{{ t("usageNotes.disclaimer") }}</li>
        </ul>
        <p v-html="contactText"></p>
      </main>
    </div>
  </div>
</template>

<i18n lang="json">
  {
    "ja": {
      "introText": "本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。データは、基本的に自由に加工し掲載・再配布して頂いて構いません。(詳細は利用条件の項をお読み下さい)",

      "csvTitle": "CSV (一般向け)",
      "csvDownloadUtf8": "CSV (UTF-8 版) をダウンロード",
      "csvDownloadShiftJis": "CSV (Shift_JIS 版) をダウンロード",

      "jsonTitle": "JSON (技術者向け)",
      "jsonUrlTitle": "データ URL",
      "jsonUrlText": "{url} から JSON データを取得できます。",
      "jsonFormatTitle": "JSON データの形式",
      "jsonFormatText": "JSON は以下の例のように、オブジェクトの配列になっています。",
      "propertyTitle": "各オブジェクトのプロパティは以下の通りです:",
      "propertyId": "各単語を一意に示すスラグ。https://genshin-dictionary.com/[ id ]/ にアクセスすると、本サイトの当該単語のページを表示できます。時折予告なく変更される場合があるため、注意して下さい。",
      "propertyEn": "英語名",
      "propertyJa": "日本語名",
      "propertyZhCN": "簡体字中国語名",
      "propertyPronunciationJa": "日本語の読み。ひらがな、カタカナ、記号が含まれます。",
      "propertyNotes": "備考 (日本語話者向け)。HTML タグが含まれる場合があります。",
      "propertyNotesZh": "備考 (中国語話者向け)。HTML タグが含まれる場合があります。",
      "propertyVariants": "よくある誤記や通称等。例えば鍾離の誤記「鐘離」や、聖遺物「血染めの騎士道」の略称「血染め」などが含まれます。",
      "propertyVariantsEn": "英語の誤記や通称等",
      "propertyVariantsJa": "日本語の誤記や通称等",
      "propertyExamples": "例文",
      "propertyExamplesEn": "例文の英語",
      "propertyExamplesJa": "例文の日本語",
      "propertyExamplesRef": "例文の出典",
      "propertyExamplesRefURL": "例文の出典のリンク",
      "propertyCreatedAt": "作成日 (yyyy-mm-dd 形式)",
      "propertyUpdatedAt": "最終更新日 (yyyy-mm-dd 形式)",
      "propertyTags": "タグ。タグは以下の種類が存在します:",

      "compatibilityTitle": "互換性",
      "compatibilityText": "本データは現在β版です。予告なく破壊的変更が入る可能性もありますので、ご了承下さい。",

      "usageNotesTitle": "利用条件",
      "lastUpdated": "最終更新: 2024年11月21日",

      "usageNotes": {
        "basic": "当サイトの配布する CSV 及び JSON の日中英対訳データ (以下「本データ」) は、自由に加工し掲載・再配布することができます。",
        "citation": "本データの出典として、当サイトのサイト名や URL などを表示する義務はありません。(勿論、表示して頂いても構いません。)",
        "revocation": {
          "intro": "以下の場合、本データの再配布の許可は取り消されます。",
          "rights": "本データを掲載・再配布することで、HoYoverse 運営各社 (miHoYo 社、Cognosphere 社、及びそれらの各国支社・子会社) やその他の第三者の権利を侵害する場合",
          "terms": "本データを掲載・再配布することで、原神や関連サービス (HoYoLab など) の利用規約に違反する場合",
          "laws": "本データを掲載・再配布することで、日本法又はあなたの居住国の法令に違反する場合",
          "request": "当サイトの運営者が本データの再配布停止を求めた場合"
        },
        "disclaimer": "本データの利用・加工・掲載・再配布に伴い、あなたや第三者に何らかの損害が生じた場合、当サイトの運営者及び本データへの開発貢献者は一切の責任を負いません。"
      },

      "contactText": "ご不明点があれば、{twitterLink} にてお問い合わせ下さい。(フォロー外から DM をお送り頂くことも可能です。)"
    }
  }
</i18n>

<script lang="ts" setup>
import tags from "~/dataset/tags.json";
import type { Locale } from "~/types.ts";

const { locale, t } = useI18n<[], Locale>();
const title = `${t("opendataTitle")} | ${t("siteTitle")}`;

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
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
