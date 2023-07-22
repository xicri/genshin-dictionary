<template>
  <div class="article__wrapper-outer">
    <div class="article__wrapper-inner">
      <h2>{{ $t("opendataTitle") }}</h2>

      <main>
        <p v-if="$i18n.locale !== 'ja'">
          <strong>This page is not translated to English/Simplified Chinese yet.</strong>
        </p>
        <p>
          本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。<br />
          データは、基本的に自由に加工し掲載・再配布して頂いて構いません。(詳細は利用上の注意の項をお読み下さい)
        </p>

        <h3>CSV (一般向け)</h3>
        <ul>
          <li>
            <a href="https://dataset.genshin-dictionary.com/words.csv" target="_blank">CSV (UTF-8 版) をダウンロード</a>
          </li>
          <li>
            <a href="https://dataset.genshin-dictionary.com/words-sjis.csv" target="_blank">CSV (Shift_JIS 版) をダウンロード</a>
          </li>
        </ul>
        <p>
          Excel を用いて CSV を開く場合は、Shift_JIS 版の利用を推奨します。UTF-8 版を用いると文字化けする可能性があります。<br />
          その他のソフトウェアを用いる場合についても、文字化けが発生する場合は UTF-8 版と Shift_JIS 版の両方を試してみて下さい。
        </p>

        <h3>JSON (技術者向け)</h3>

        <h4>データ URL</h4>
        <p>
          <a href="https://dataset.genshin-dictionary.com/words.json" target="_blank">https://dataset.genshin-dictionary.com/words.json</a> からデータを取得できます。
        </p>

        <h4>データ形式</h4>
        <p>
          JSON は以下の例のように、オブジェクトの配列になっています。
        </p>
        <code>
          <pre>[
  {
    "id": "zhongli",
    "en": "Zhongli",
    "ja": "鍾離",
    "zhCN": "钟离",
    "pronunciationJa": "しょうり",
    "notes": "読みは「ヂョンリー」",
    "notesZh": "锺离是中国古代早已有之的一个汉字复姓。…",
    "variants": {
      ja: [ "鐘離" ],
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
      "refURL": "https://www.youtube.com/watch?v=jvmz4TrPgUE&t=16s",
    }],
    "createdAt": "2022-01-01",
    "updatedAt": "2022-01-01",
    "tags": [ "inazuma" ]
  },
  // ...
]</pre>
        </code>
        <p>各オブジェクトのプロパティは以下の通りです:</p>
        <ul>
          <li><code>id</code> (String) ― 各単語を一意に示す ID。https://genshin-dictionary.com/{ ID }/ にアクセスすると、本サイトの当該単語のページを表示できます。時折予告なく変更される場合があるため、注意して下さい。</li>
          <li><code>en</code> (String) ― 英語名</li>
          <li><code>ja</code> (String) ― 日本語名</li>
          <li><code>zhCN</code> (String) ― 中国語名</li>
          <li><code>pronunciationJa</code> (String) ― 日本語の読み。ひらがな、カタカナ、記号が含まれます。</li>
          <li><code>notes</code> (String)― 備考 (日本語話者向け)。HTML が含まれる場合があります。</li>
          <li><code>notesZh</code> (String)― 備考 (中国語話者向け)。HTML が含まれる場合があります。</li>
          <li><code>variants</code> (Object)― よくある誤記や通称等。例えば鍾離の誤記「鐘離」や、聖遺物「血染めの騎士道」の略称「血染め」などが含まれます。</li>
          <li><code>variants.en</code> (string[])― 英語の誤記や通称等</li>
          <li><code>variants.ja</code> (string[])― 日本語の誤記や通称等</li>
          <li><code>examples</code> (Object[]) ― 例文</li>
          <li><code>examples[].en</code> (String) ― 例文の英語</li>
          <li><code>examples[].ja</code> (String) ― 例文の日本語</li>
          <li><code>examples[].ref</code> (String) ― 例文の出典</li>
          <li><code>examples[].refURL</code> (String) ― 例文の出典のリンク</li>
          <li><code>createdAt</code> (String) ― 作成日 (yyyy-mm-dd 形式)</li>
          <li><code>updatedAt</code> (String) ― 最終更新日 (yyyy-mm-dd 形式)</li>
          <li>
            <code>tags</code> (String[]) ― タグ。タグは以下の種類が存在します:
            <ul>
              <li v-for="[ tagID, tag ] in Object.entries(tags)" :key="tagID">
                <code>{{ tagID }}</code> ― {{ tag.ja }}
              </li>
            </ul>
          </li>
        </ul>

        <h4>互換性</h4>
        <p>
          本データは現在β版です。予告なく破壊的変更が入る可能性もありますので、ご了承下さい。
        </p>

        <h3>利用上の注意</h3>
        <p>最終更新: 2022年1月3日</p>
        <ul>
          <li>当サイトの配布する CSV 及び JSON の日英対訳データ (以下「本データ」) は、自由に加工し掲載・再配布することができます。</li>
          <li>本データの出典として、当サイトのサイト名や URL などを表示する義務はありません。(勿論、表示して頂いても構いません。)</li>
          <li>
            以下の場合、本データの利用許可は取り消されます。利用許可の取り消しによって、本データ又は本データを加工して作成した成果物を掲載・再配布する権利があなたから失われる場合、速やかに掲載・再配布を停止しなければなりません。
            <ul>
              <li>
                本データを掲載・再配布することで、Hoyoverse 運営各社 (COGNOSPHERE PTE. LTD.、上海米哈游網絡科技股份有限公司、株式会社 miHoYo、その他各国支社・子会社) やその他の第三者の権利を侵害する場合
              </li>
              <li>本データを掲載・再配布することで、原神や関連サービス (HoYoLab など) の利用規約に違反する場合</li>
              <li>本データを掲載・再配布することで、日本法又はあなたの居住国の法令に違反する場合</li>
              <li>当サイトの運営者が本データの利用停止を求めた場合</li>
            </ul>
          </li>
          <li>本データの利用・加工・掲載・再配布に伴い、あなたや第三者に何らかの損害が生じた場合、当サイトの運営者は一切の責任を負いません。</li>
        </ul>
        <p>
          ご不明点があれば、<a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a> にてお問い合わせ下さい。(フォロー外から DM をお送り頂くことも可能です。)
        </p>
      </main>
    </div>
  </div>
</template>

<script setup>
import tags from "~/dataset/tags.json";

const { locale, t } = useI18n();
const title = `${ t("opendataTitle") } | ${ t("siteTitle") }`;

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },

    // noindex untranslated pages
    ...(locale !== "ja" ? [{
      hid: "noindex",
      name: "robots",
      content: "noindex",
    }] : []),
  ],
});
</script>

<style lang="scss" src="~/assets/styles/articles.scss" scoped></style>
