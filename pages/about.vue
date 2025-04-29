<template>
  <div class="article__wrapper-outer">
    <div class="article__wrapper-inner">
      <h2>{{ t("aboutTitle") }}</h2>

      <main>
        <p v-html="aboutIntroText"></p>
        <p>{{ t("wordCount", { count: wordCount }) }}</p>

        <h3>{{ t("precautionsTitle") }}</h3>
        <p>{{ t("precautions1") }}</p>
        <p v-if="locale === 'ja'">
          読み仮名は検索精度の向上を目的として付けており、その正確性について十分な調査をしておりません。間違いが多く含まれる可能性があることをご了承下さい。
        </p>
        <p>{{ t("precautions2") }}</p>

        <h3>{{ t("operatorTitle") }}</h3>
        <ul>
          <li v-html="operatorText"></li>
          <li v-html="contributorText"></li>
        </ul>

        <p v-html="contactText"></p>

        <h3>{{ t("creditsTitle") }}</h3>
        <p v-html="credits1Text"></p>
        <p v-html="credits2Text"></p>
        <p v-html="credits3Text"></p>
        <p v-html="credits4Text"></p>
      </main>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "aboutTitle": "About this website",
    "aboutDescription": "About the Genshin Dictionary. This website is an online English-Chinese-Japanese dictionary for the proprietary terms used in a computer game Genshin Impact.",
    "aboutIntro": "This website is an online English-Chinese-Japanese dictionary for the proprietary terms used in a computer game {genshinLink}.",
    "wordCount": "Currently, this dictionary has {count} words.",
    "precautionsTitle": "Notice and Disclaimer",
    "precautions1": "Since the translations on this website are the proprietary terms for a computer game, the most of the words are not literally translated.",
    "precautions2": "This website is fanmade and not affiliated or endorsed by miHoYo and HoYoverse (Cognosphere).",
    "operatorTitle": "Owner and Contributors",
    "operator": "Owner: Xicri ({twitterLink} / {githubLink})",
    "contributor": "Initial Chinese translation: Bill Haku ({bilibiliLink} / {twitterLink} / {githubLink})",
    "contact1": "Contact the owner on {twitterLink}. (DM available)",
    "contact2": "If you have any bug reports, questions for opendata/API, or any other technical inquiries, GitHub {issuesLink} and  {discussionsLink} are also available for the contact.",
    "contact3": "English or Japanese are preferrable languages to contact.",
    "creditsTitle": "Credits",
    "credits1": "Japanese pronunciation data for some words are derived from {genshinDictionaryLink} and {genshinKanjiLabLink}.",
    "credits2": "Some translations for the Artifacts added on the early days of this website is referrenced from {genshinWikiLink}.",
    "credits3": "This website uses {octiconsLink} provided by GitHub, Inc. under {licenseLink}",
    "credits4": "The favicon of this website use {logoTypeGothicLink}.",
    "genshinDictionary": "原神用語辞書",
    "genshinKanjiLab": "原神漢字研究所",
    "genshinImpact": "Genshin Impact",
    "license": "license",
    "logoTypeGothic": "Logo Type Gothic"
  },
  "ja": {
    "aboutTitle": "このサイトについて",
    "aboutDescription": "原神 英語・中国語辞典についての説明です。このサイトはゲーム「原神」で用いられる固有名詞等の日本語・英語・中国語対訳表です。",
    "aboutIntro": "このサイトはゲーム「{genshinLink}」で用いられる固有名詞等の日本語・英語・中国語対訳表です。",
    "wordCount": "現在の収録単語数は{count}語です。",
    "precautionsTitle": "ご利用にあたっての注意・免責事項",
    "precautions1": "本サイトはゲームの固有名詞等の対訳を掲載している都合上、意訳が多く、一般的な意味とは訳が異なる場合がありますので、ご注意下さい。",
    "precautions2": "このサイトは一プレイヤーが運営しているファンサイトであり、開発元である HoYoverse (Cognosphere 社) 及び miHoYo 社とは関係ありません。",
    "operatorTitle": "運営者・貢献者",
    "operator": "運営者: シクリ ({twitterLink} / {githubLink})",
    "contributor": "中国語翻訳データ作成: Bill Haku ({bilibiliLink} / {twitterLink} / {githubLink})",
    "contact1": "お問い合わせなどの際は {twitterLink} からご連絡下さい。(DM 可)",
    "contact2": "バグ報告やオープンデータ・API 関連、その他技術的なお問い合わせについては、GitHub の {issuesLink} や {discussionsLink} からお問い合わせ頂いても構いません。",
    "contact3": "お問い合わせの際は、できるだけ日本語又は英語でお願いします。",
    "creditsTitle": "クレジット",
    "credits1": "本サイトの読み仮名データの一部は、{genshinDictionaryLink}及び{genshinKanjiLabLink}を参照しています。",
    "credits2": "本サイト運営初期に追加された聖遺物など一部の単語については {genshinWikiLink} を参照しています。",
    "credits3": "本サイトは GitHub 社により {licenseLink}にて提供されている {octiconsLink} を利用しています。",
    "credits4": "本サイトの favicon の一部には{logoTypeGothicLink}を利用しています。",
    "genshinDictionary": "原神用語辞書",
    "genshinKanjiLab": "原神漢字研究所",
    "genshinImpact": "原神",
    "license": "ライセンス",
    "logoTypeGothic": "ロゴたいぷゴシック"
  },
  "zh-CN": {
    "aboutTitle": "关于本站",
    "aboutDescription": "关于本站：本站是一个在线的中日英三语词典，收录了《原神》中使用的专有词汇。",
    "aboutIntro": "本站是一个在线的中日英三语词典，收录了《{genshinLink}》中使用的专有词汇。",
    "wordCount": "截至目前，本站已收集了 {count} 个专有词汇。",
    "precautionsTitle": "使用注意事项及免责声明",
    "precautions1": "由于本站收录的是《原神》中的专有词汇，因此大多数单词并非直译。",
    "precautions2": "本站是一个由《原神》玩家制作并运营的网站，与开发商上海米哈游网络科技股份有限公司及 Cognosphere Pte., Ltd. (HoYoverse) 无关。",
    "operatorTitle": "运营者及贡献者",
    "operator": "运营者：Xicri ({twitterLink} / {githubLink})",
    "contributor": "中文翻译：Bill Haku ({bilibiliLink} / {twitterLink} / {githubLink})",
    "contact1": "通过 {twitterLink} 联系运营者（可发送私信）。",
    "contact2": "如果您发现错误，或对开放数据、API 及其他技术相关问题有疑问，也可通过 GitHub {issuesLink} 及 GitHub {discussionsLink} 联系。",
    "contact3": "请尽量使用英语或日语联系运营者。",
    "creditsTitle": "致谢",
    "credits1": "本站某些词汇的日语发音数据来自 {genshinDictionaryLink} 及 {genshinKanjiLabLink} 。",
    "credits2": "本站建立之初添加的一些词汇（如圣遗物）的内容来自 {genshinWikiLink} 。",
    "credits3": "本站使用了 GitHub, Inc. 基于{licenseLink}提供的 {octiconsLink}。",
    "credits4": "本站的图标来自 {logoTypeGothicLink}。",
    "genshinDictionary": "原神用語辞書",
    "genshinKanjiLab": "原神漢字研究所",
    "genshinImpact": "原神",
    "license": "许可证",
    "logoTypeGothic": "Logo Type Gothic 字体"
  },
  "zh-TW": {
    "aboutTitle": "關於本站",
    "aboutDescription": "關於本站：本站是一個線上中日英三語詞典，收錄了《原神》中使用的專有詞彙。",
    "aboutIntro": "本站是一個線上中日英三語詞典，收錄了《{genshinLink}》中使用的專有詞彙。",
    "wordCount": "截至目前，本站已收集了 {count} 個專有詞彙。",
    "precautionsTitle": "使用注意事項及免責聲明",
    "precautions1": "由於本站收錄的是《原神》中的專有詞彙，因此大多數詞彙並非直譯。",
    "precautions2": "本站由《原神》玩家製作並運營，與開發商上海米哈遊網絡科技股份有限公司及 Cognosphere Pte., Ltd. (HoYoverse) 無關。",
    "operatorTitle": "營運者及貢獻者",
    "operator": "營運者：Xicri ({twitterLink} / {githubLink})",
    "contributor": "中文翻譯：Bill Haku ({bilibiliLink} / {twitterLink} / {githubLink})",
    "contact1": "透過 {twitterLink} 聯絡營運者（可發送私訊）。",
    "contact2": "若您發現錯誤，或對開放資料、API 及其他技術相關問題有疑問，也可透過 GitHub {issuesLink} 及 GitHub {discussionsLink} 聯絡。",
    "contact3": "請盡量使用英語或日語聯絡營運者。",
    "creditsTitle": "致謝",
    "credits1": "本站某些詞彙的日語發音資料來自 {genshinDictionaryLink} 及 {genshinKanjiLabLink}。",
    "credits2": "本站建立之初新增的一些詞彙（如聖遺物）內容來自 {genshinWikiLink}。",
    "credits3": "本站使用了 GitHub, Inc. 基於 {licenseLink} 提供的 {octiconsLink}。",
    "credits4": "本站的圖示來自 {logoTypeGothicLink}。",
    "genshinDictionary": "原神用語辭典",
    "genshinKanjiLab": "原神漢字研究所",
    "genshinImpact": "原神",
    "license": "許可證",
    "logoTypeGothic": "Logo Type Gothic 字體"
  }
}
</i18n>

<script lang="ts" setup>
import words from "~/dataset/words.json";
import type { Locale } from "~/types.ts";

const { locale, t } = useI18n<[], Locale>();
const title = `${t("aboutTitle")} | ${t("siteTitle")}`;
const description = t("aboutDescription");

useHead({
  title,
  meta: [
    { property: "og:title", content: title },
    { name: "description", content: description },
    { property: "og:description", content: description }
  ],
});

const wordCount = words.length;

const createLink = (url: string, text: string) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;

const aboutIntroText = computed(() => {
  const genshinLink = createLink(
    locale.value === "zh-CN" ? "https://ys.mihoyo.com" : "https://genshin.hoyoverse.com",
    t("genshinImpact")
  );
  return t("aboutIntro", { genshinLink });
});

const operatorText = computed(() => {
  const twitterLink = createLink("https://x.com/xicri_gi", "X (Twitter)");
  const githubLink = createLink("https://github.com/xicri", "GitHub");
  return t("operator", { twitterLink, githubLink });
});

const contributorText = computed(() => {
  const bilibiliLink = createLink("https://space.bilibili.com/158463764", "BiliBili");
  const twitterLink = createLink("https://x.com/Haku_Bill", "X (Twitter)");
  const githubLink = createLink("https://github.com/Bill-Haku", "GitHub");
  return t("contributor", { bilibiliLink, twitterLink, githubLink });
});

const contactText = computed(() => {
  const twitterLink = createLink("https://x.com/xicri_gi", "X (Twitter)");
  const issuesLink = createLink("https://github.com/xicri/genshin-dictionary/issues", "Issues");
  const discussionsLink = createLink("https://github.com/xicri/genshin-dictionary/discussions", "Discussions");

  return t("contact1", { twitterLink }) + "<br />"
    + t("contact2", { issuesLink, discussionsLink }) + "<br />"
    + t("contact3");
});

const credits1Text = computed(() => {
  const genshinDictionaryLink = createLink("http://anemoarchon.s205.xrea.com/#/gdic", t("genshinDictionary"));
  const genshinKanjiLabLink = createLink("https://x.com/genshin_kanji", t("genshinKanjiLab"));
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
