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
          <li><code>notesZhTW</code> ― {{ t("propertyNotesZhTW") }}</li>
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
    "en": {
      "introText": "The translation data on this website is distributed as CSV (for general public) and JSON (for software engineers) formats. You can modify and re-distribute the data. (See the Terms of Use section)",
      "csvTitle": "CSV (for general public)",
      "csvDownloadUtf8": "Download CSV (UTF-8; recommended for most of non-Japanese speakers)",
      "csvDownloadShiftJis": "Download CSV (Shift_JIS; recommended only for Japanese version of Microsoft Excel)",

      "jsonTitle": "JSON (for software engineers)",
      "jsonUrlTitle": "URL of the Data",
      "jsonUrlText": "You can fetch JSON data from: {url}",
      "jsonFormatTitle": "JSON data format",
      "jsonFormatText": "The JSON data is given as an array of the objects as the following example.",
      "propertyTitle": "Here's the referrence document of the each properties:",
      "propertyId": "A unique slug for the each words. https://genshin-dictionary.com/[ ID ]/ is the URL for the page of the word. This slug can be changed without announcement.",
      "propertyEn": "The English translation",
      "propertyJa": "The Japanese translation",
      "propertyZhCN": "Simplified Chinese translation",
      "propertyPronunciationJa": "Japanese pronunciation in Kana. It can include Hiragana, Katakana, and symbols.",
      "propertyNotes": "Note for Japanese speakers. It can include HTML tags.",
      "propertyNotesZh": "Note for Simplified Chinese speakers. It can include HTML tags.",
      "propertyNotesZhTW": "Note for Traditional Chinese speakers. It can include HTML tags.",
      "propertyVariants": "Variants such as commonly known typo and unofficial nicknames. For example, \"凌华\", the Chinese mistype of Ayaka (绫华) and \"CW\", a short name of an Artifact \"Crimson Witch of Flames\".",
      "propertyVariantsEn": "English variants",
      "propertyVariantsJa": "Japanese variants",
      "propertyExamples": "Example sentences",
      "propertyExamplesEn": "English example sentences",
      "propertyExamplesJa": "Japanese example sentences",
      "propertyExamplesRef": "The source of the example sentence",
      "propertyExamplesRefURL": "The URL to the source of the example sentence",
      "propertyCreatedAt": "The date we added the word (yyyy-mm-dd format)",
      "propertyUpdatedAt": "The data we updated the word (yyyy-mm-dd format)",
      "propertyTags": "Tags. Here's the list of the tags:",

      "compatibilityTitle": "Compatibility",
      "compatibilityText": "This data is currently β. We might apply breaking changes at anytime without announcement.",

      "usageNotesTitle": "Terms of use",
      "lastUpdated": "Last updated at: 2024/11/21",

      "usageNotes": {
        "basic": "You can modify and re-distribute CSVs and JSON data of the English-Chinese-Japanese translations (\"The Data\")",
        "citation": "You don't have to give the credit to this website and provide link to its URL. (However, we welcome if you give the credit)",
        "revocation": {
          "intro": "We cancel the permission to redistribute The Data if:",
          "rights": "you have violate the rights of the HoYoverse companies (i.e. miHoYo, Cognosphere, and their local branches and subsidiaries) and any thirdparties.",
          "terms": "you violate agreements of the Genshin Impact game and its related services such as HoYoLab.",
          "laws": "you violate Japanese law or the law of the country you live.",
          "request": "the owner of this website request to stop redistribution."
        },
        "disclaimer": "The owner of this website and the contributors of The Data assumes no responsibility for any damages while you use, modify, publish, or redistribute The Data."
      },

      "contactText": "If you have any questions, contact via {twitterLink}. (You don't have to follow me to send me the DMs.)"
    },
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
      "propertyNotes": "日本語話者向け備考。HTML タグが含まれる場合があります。",
      "propertyNotesZh": "中国語 (簡体字) 話者向け備考。HTML タグが含まれる場合があります。",
      "propertyNotesZhTW": "中国語 (繁体字) 話者向け。HTML タグが含まれる場合があります。",
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
    },
    "zh-CN": {
      "introText": "本站的翻译数据以 CSV（适合普通用户）和 JSON（适合开发者）格式提供。您可以自由修改和再分发这些数据。（详细信息请参阅“使用条款”部分）",

      "csvTitle": "CSV（适合普通用户）",
      "csvDownloadUtf8": "下载 CSV（UTF-8；建议大多数非日语用户使用）",
      "csvDownloadShiftJis": "下载 CSV（Shift_JIS；仅推荐使用日语版 Microsoft Excel 的用户使用）",

      "jsonTitle": "JSON（适合开发者）",
      "jsonUrlTitle": "数据 URL",
      "jsonUrlText": "您可以通过以下链接获取 JSON 数据：{url}",
      "jsonFormatTitle": "JSON 数据格式",
      "jsonFormatText": "JSON 数据是一个对象数组，格式如下所示：",
      "propertyTitle": "以下是各属性的说明：",
      "propertyId": "每个词条的唯一标识。访问 https://genshin-dictionary.com/[ID]/ 可以查看词条的页面。此标识可能会不定期更改。",
      "propertyEn": "词条的英文翻译",
      "propertyJa": "词条的日文翻译",
      "propertyZhCN": "词条的简体中文翻译",
      "propertyPronunciationJa": "词条的日语发音，可能包含平假名、片假名及符号。",
      "propertyNotes": "面向日语用户的备注，可包含 HTML 标签。",
      "propertyNotesZh": "Note for Simplified Chinese speakers. It can include HTML tags.",
      "propertyNotesZhTW": "Note for Traditional Chinese speakers. It can include HTML tags.",
      "propertyVariants": "常见错别字或非官方昵称，例如“凌华”是绫华的中文错别字，“CW”是圣遗物“炽烈的炎之魔女”的简称。",
      "propertyVariantsEn": "词条的英文变体",
      "propertyVariantsJa": "词条的日文变体",
      "propertyExamples": "例句",
      "propertyExamplesEn": "英文例句",
      "propertyExamplesJa": "日文例句",
      "propertyExamplesRef": "例句的来源",
      "propertyExamplesRefURL": "例句来源的链接",
      "propertyCreatedAt": "词条添加日期（yyyy-mm-dd 格式）",
      "propertyUpdatedAt": "词条更新日期（yyyy-mm-dd 格式）",
      "propertyTags": "标签，以下是可用标签的列表：",

      "compatibilityTitle": "兼容性",
      "compatibilityText": "目前数据处于 β 版本，可能会随时进行重大更改，恕不另行通知。",

      "usageNotesTitle": "使用条款",
      "lastUpdated": "最后更新：2024/11/21",

      "usageNotes": {
        "basic": "您可以自由修改和再分发本站提供的中日英翻译数据（以下简称“数据”）。",
        "citation": "无需注明本站为数据的来源或提供链接。（当然，如果您愿意标明，我们将非常感谢。）",
        "revocation": {
          "intro": "在以下情况下，我们将取消您再分发数据的许可：",
          "rights": "您侵犯了米哈游（如上海米哈游网络科技股份有限公司、株式会社miHoYo、Cognosphere Pte., Ltd. (HoYoverse) 及其分支机构或子公司）或第三方的权益。",
          "terms": "您违反了《原神》游戏及其相关服务（如米游社、HoYoLab）的用户协议。",
          "laws": "您违反了日本法律或您所在国家/地区的法律。",
          "request": "本站运营者要求您停止再分发数据。"
        },
        "disclaimer": "本站运营者及数据贡献者对您在使用、修改、发布或再分发数据过程中造成的任何损失概不负责。"
      },
      "contactText": "如有任何问题，请通过 {twitterLink} 联系运营者。（无需关注即可发送私信）"
    },
    "zh-TW": {
      "introText": "本站的翻譯資料以 CSV（適合一般使用者）及 JSON（適合開發者）格式提供。您可以自由修改及再分發這些資料。（詳細資訊請參閱「使用條款」部分）",
      "csvTitle": "CSV（適合一般使用者）",
      "csvDownloadUtf8": "下載 CSV（UTF-8；建議大多數非日語使用者使用）",
      "csvDownloadShiftJis": "下載 CSV（Shift_JIS；僅建議使用日文版 Microsoft Excel 的使用者使用）",
      "jsonTitle": "JSON（適合開發者）",
      "jsonUrlTitle": "資料 URL",
      "jsonUrlText": "您可以透過以下連結取得 JSON 資料：{url}",
      "jsonFormatTitle": "JSON 資料格式",
      "jsonFormatText": "JSON 資料是一個物件陣列，格式如下：",
      "propertyTitle": "以下是各屬性的說明：",
      "propertyId": "每個詞條的唯一識別標誌。造訪 https://genshin-dictionary.com/[ID]/ 可查看詞條頁面。此識別標誌可能不定期變更。",
      "propertyEn": "詞條的英文翻譯",
      "propertyJa": "詞條的日文翻譯",
      "propertyZhCN": "詞條的簡體中文翻譯",
      "propertyPronunciationJa": "詞條的日文讀音，可能包含平假名、片假名及符號。",
      "propertyNotes": "面向日語使用者的備註，可包含 HTML 標籤。",
      "propertyNotesZh": "Note for Simplified Chinese speakers. It can include HTML tags.",
      "propertyNotesZhTW": "Note for Traditional Chinese speakers. It can include HTML tags.",
      "propertyVariants": "常見錯別字或非官方暱稱，例如「凌華」是綾華的中文錯別字，「CW」是聖遺物「熾烈的炎之魔女」的簡稱。",
      "propertyVariantsEn": "詞條的英文變體",
      "propertyVariantsJa": "詞條的日文變體",
      "propertyExamples": "例句",
      "propertyExamplesEn": "英文例句",
      "propertyExamplesJa": "日文例句",
      "propertyExamplesRef": "例句來源",
      "propertyExamplesRefURL": "例句來源連結",
      "propertyCreatedAt": "詞條添加日期（yyyy‑mm‑dd 格式）",
      "propertyUpdatedAt": "詞條更新日期（yyyy‑mm‑dd 格式）",
      "propertyTags": "標籤，以下為可用標籤列表：",
      "compatibilityTitle": "相容性",
      "compatibilityText": "目前資料屬於 β 版本，可能隨時進行重大更動，恕不另行通知。",
      "usageNotesTitle": "使用條款",
      "lastUpdated": "最後更新：2024/11/21",
      "usageNotes": {
        "basic": "您可以自由修改及再分發本站提供的中日英翻譯資料（以下簡稱「資料」）。",
        "citation": "無需註明本站為資料來源或提供連結。（當然，如果您願意標註，我們將非常感謝。）",
        "revocation": {
          "intro": "在以下情況下，我們將取消您再分發資料的許可：",
          "rights": "您侵犯了米哈遊（如上海米哈遊網絡科技股份有限公司、miHoYo、Cognosphere Pte., Ltd. (HoYoverse) 及其分支機構或子公司）或第三方的權益。",
          "terms": "您違反了《原神》遊戲及其相關服務（如米遊社、HoYoLab）的使用條款。",
          "laws": "您違反了日本法律或您所在國家的法律。",
          "request": "本站運營者要求您停止再分發資料。"
        },
        "disclaimer": "本站運營者及資料貢獻者對您在使用、修改、發佈或再分發資料過程中造成的任何損失概不負責。"
      },
      "contactText": "如有任何問題，請透過 {twitterLink} 聯絡運營者。（無需追蹤亦可發送私訊）"
    }
  }
</i18n>

<script lang="ts" setup>
import tags from "~/dataset/tags.json";
import type { Locale } from "~/types.ts";

const { locale, t } = useI18n<[], Locale>();
const title = `${ t("opendataTitle") } | ${ t("siteTitle") }`;

useHead({
  title,
  meta: [
    { property: "og:title", content: title },
  ],
});

const jsonExample = `[
  {
    "id": "zhongli",
    "en": "Zhongli",
    "ja": "鍾離",
    "zhCN": "钟离",
    "zhTW": "鍾離",
    "pronunciationJa": "しょうり",
    "notes": "読みは「ヂョンリー」(<a href=\\"https://youtu.be/p10yiwULJA8?t=118\\" target=\\"_blank\\" rel=\\"noopener\\">参考動画</a>)",
    "notesZh": "「锺离」（曾经简化字写作「钟离」）是中国古代早已有之的汉字复姓。…",
    "notesZhTW": "「鍾離」是中國古代早已有之的漢字複姓。…",
    "variants": {
      "ja": [ "鐘離" ]
    },
    "createdAt": "2022-01-01",
    "updatedAt": "2025-01-01",
    "tags": [ "liyue", "character-main" ]
  },
  {
    "id": "inazuman",
    "en": "Inazuman",
    "ja": "稲妻人 / 稲妻の",
    "zhCN": "稻妻人 / 稻妻的",
    "zhTW": "稻妻人 / 稻妻的",
    "pronunciationJa": "いなずまじん / いなずまの",
    "notes": "元々 Inazuman は非公式にプレイヤーの間で使われる言葉であったが…(以下略)",
    "examples": [{
      "en": "Inazumans are definitely more particular about etiquette than Mondstadters!",
      "ja": "モンド人よりも、稲妻人の方が礼儀に対して気を配っている。",
      "zhCN": "比起蒙德人，稻妻人更加在意礼节。",
      "zhTW": "比起蒙德人，稻妻人更加在意禮節。",
      "ref": "トーマ, キャラクター実戦紹介 トーマ「烈炎の守護」",
      "refURL": "https://www.youtube.com/watch?v=HPoeE5PRWTw&t=15s"
    }],
    "createdAt": "2022-01-01",
    "updatedAt": "2025-01-01",
    "tags": [ "inazuma" ]
  }
]`;

const downloadLink = computed(() => {
  const dlLink = "<a href=\"https://dataset.genshin-dictionary.com/words.json\" target=\"_blank\" rel=\"noopener\">https://dataset.genshin-dictionary.com/words.json</a>";
  return t("jsonUrlText", { url: dlLink });
});

const contactText = computed(() => {
  const twitterLink = "<a href=\"https://x.com/xicri_gi\" target=\"_blank\" rel=\"noopener\">X (Twitter)</a>";
  return t("contactText", { twitterLink });
});
</script>

<style lang="scss" src="~/assets/styles/articles.scss" scoped></style>
