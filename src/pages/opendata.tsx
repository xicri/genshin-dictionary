import Head from "next/head";
import { I18n, validateLocale } from "@/libs/i18n";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { BuiltWord, Locale } from "@/types";
import { Sentence } from "@/components/Sentence";
import { Article } from "@/components/Article";
import allTags from "../../public/dataset/tags.json";

import { styles } from "@/styles/article";

type Props = {
  locale: Locale,
  wordDataExample: string,
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const wordDataExampleObject: BuiltWord[] = [
    {
      id: "zhongli",
      en: "Zhongli",
      ja: "鍾離",
      zhCN: "钟离",
      pronunciationJa: "しょうり",
      notes: "読みは「ヂョンリー」",
      notesZh: "锺离是中国古代早已有之的一个汉字复姓。…",
      variants: {
        ja: [ "鐘離" ],
      },
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
      tags: [ "liyue", "character-main" ],
    },
    {
      id: "inazuman",
      en: "Inazuman",
      ja: "稲妻人",
      zhCN: "稻妻人 / 稻妻的",
      pronunciationJa: "いなずまじん",
      notes: "元々 Inazuman は非公式にプレイヤーの間で使われる言葉であったが…(以下略)",
      examples: [{
        en: "Inazumans are definitely more particular about etiquette than Mondstadters!",
        ja: "モンド人よりも、稲妻人の方が礼儀に対して気を配っている。",
        ref: "トーマ, キャラクター実戦紹介 トーマ「烈炎の守護」",
        refURL: "https://www.youtube.com/watch?v=jvmz4TrPgUE&t=16s",
      }],
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
      tags: [ "inazuma" ],
    },
  ];

  return {
    props: {
      locale: validateLocale(locale),
      wordDataExample: JSON.stringify(wordDataExampleObject, null, 2)
        .replace(/\]$/, `
  // ...
]
`),
    },
  };
};

export default function AboutPage({ locale, wordDataExample }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const i18n = new I18n(locale, {
    en: {
      opendataTitle: "Open Data / API (β)",
    },
    ja: {
      opendataTitle: "オープンデータ・API (β)",
    },
    "zh-CN": {
      opendataTitle: "开放数据 · API (β)",
    },
  });

  const title = `${ i18n.t("opendataTitle") } | ${ i18n.t("siteTitle") }`;
  // const description = t("opendataDescription"); // TODO

  return (
    <>
      <style jsx>{ styles }</style>

      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={ title } />
        {/* TODO
        <meta name="description" content={ description } />
        <meta property="og:description" content={ description } />
        */}
        { locale !== "ja" ? (<meta name="robots" content="noindex" />) : "" }
      </Head>

      <div className="article__wrapper-outer">
        <div className="article__wrapper-inner">
          <Article locale={locale}>
            <h2>{ i18n.t("opendataTitle") }</h2>

            <main>
              { locale !== "ja" ? (
                <p>
                  <strong>This page is not translated to English/Simplified Chinese yet.</strong>
                </p>
              ) : "" }

              <p>
                <Sentence lang="en">
                  本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。<br />
                  データは、基本的に自由に加工し掲載・再配布して頂いて構いません。(詳細は利用上の注意の項をお読み下さい)
                </Sentence>
                <Sentence lang="ja">
                  本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。<br />
                  データは、基本的に自由に加工し掲載・再配布して頂いて構いません。(詳細は利用上の注意の項をお読み下さい)
                </Sentence>
                <Sentence lang="zh-CN">
                  本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。<br />
                  データは、基本的に自由に加工し掲載・再配布して頂いて構いません。(詳細は利用上の注意の項をお読み下さい)
                </Sentence>
              </p>

              <h3>
                <Sentence lang="en">CSV (一般向け)</Sentence>
                <Sentence lang="ja">CSV (一般向け)</Sentence>
                <Sentence lang="zh-CN">CSV (一般向け)</Sentence>
              </h3>
              <ul>
                <li>
                  <a href="https://dataset.genshin-dictionary.com/words.csv" target="_blank">
                    <Sentence lang="en">CSV (UTF-8 版) をダウンロード</Sentence>
                    <Sentence lang="ja">CSV (UTF-8 版) をダウンロード</Sentence>
                    <Sentence lang="zh-CN">CSV (UTF-8 版) をダウンロード</Sentence>
                  </a>
                </li>
                <Sentence lang="ja">
                  <li>
                    <a href="https://dataset.genshin-dictionary.com/words-sjis.csv" target="_blank">
                      CSV (Shift_JIS 版) をダウンロード
                    </a>
                  </li>
                </Sentence>
              </ul>
              <Sentence lang="ja">
                <p>
                  Excel を用いて CSV を開く場合は、Shift_JIS 版の利用を推奨します。UTF-8 版を用いると文字化けする可能性があります。<br />
                  その他のソフトウェアを用いる場合についても、文字化けが発生する場合は UTF-8 版と Shift_JIS 版の両方を試してみて下さい。
                </p>
              </Sentence>

              <h3>
                <Sentence lang="en">JSON (技術者向け)</Sentence>
                <Sentence lang="ja">JSON (技術者向け)</Sentence>
                <Sentence lang="zh-CN">JSON (技術者向け)</Sentence>
              </h3>

              <h4>
                <Sentence lang="en">データ URL</Sentence>
                <Sentence lang="ja">データ URL</Sentence>
                <Sentence lang="zh-CN">データ URL</Sentence>
              </h4>
              <p>
                <Sentence lang="en">
                  <a href="https://dataset.genshin-dictionary.com/words.json" target="_blank">https://dataset.genshin-dictionary.com/words.json</a> からデータを取得できます。
                </Sentence>
                <Sentence lang="ja">
                  <a href="https://dataset.genshin-dictionary.com/words.json" target="_blank">https://dataset.genshin-dictionary.com/words.json</a> からデータを取得できます。
                </Sentence>
                <Sentence lang="zh-CN">
                  <a href="https://dataset.genshin-dictionary.com/words.json" target="_blank">https://dataset.genshin-dictionary.com/words.json</a> からデータを取得できます。
                </Sentence>
              </p>

              <h4>
                <Sentence lang="en">データ形式</Sentence>
                <Sentence lang="ja">データ形式</Sentence>
                <Sentence lang="zh-CN">データ形式</Sentence>
              </h4>
              <p>
                <Sentence lang="en">JSON は以下の例のように、オブジェクトの配列になっています。</Sentence>
                <Sentence lang="ja">JSON は以下の例のように、オブジェクトの配列になっています。</Sentence>
                <Sentence lang="zh-CN">JSON は以下の例のように、オブジェクトの配列になっています。</Sentence>
              </p>
              <code>
                <pre>{ wordDataExample }</pre>
              </code>
              <p>
                <Sentence lang="en">各オブジェクトのプロパティは以下の通りです:</Sentence>
                <Sentence lang="ja">各オブジェクトのプロパティは以下の通りです:</Sentence>
                <Sentence lang="zh-CN">各オブジェクトのプロパティは以下の通りです:</Sentence>
              </p>
              <ul>
                <li>
                  <code>id</code> (String) ―
                  <Sentence lang="en">
                    各単語を一意に示す ID。https://genshin-dictionary.com/&#123; ID &#125;/ にアクセスすると、本サイトの当該単語のページを表示できます。時折予告なく変更される場合があるため、注意して下さい。
                  </Sentence>
                  <Sentence lang="ja">
                    各単語を一意に示す ID。https://genshin-dictionary.com/&#123; ID &#125;/ にアクセスすると、本サイトの当該単語のページを表示できます。時折予告なく変更される場合があるため、注意して下さい。
                  </Sentence>
                  <Sentence lang="zh-CN">
                    各単語を一意に示す ID。https://genshin-dictionary.com/&#123; ID &#125;/ にアクセスすると、本サイトの当該単語のページを表示できます。時折予告なく変更される場合があるため、注意して下さい。
                  </Sentence>
                </li>
                <li>
                  <code>en</code> (String) ―
                  <Sentence lang="en">英語名</Sentence>
                  <Sentence lang="ja">英語名</Sentence>
                  <Sentence lang="zh-CN">英語名</Sentence>
                </li>
                <li>
                  <code>ja</code> (String) ―
                  <Sentence lang="en">日本語名</Sentence>
                  <Sentence lang="ja">日本語名</Sentence>
                  <Sentence lang="zh-CN">日本語名</Sentence>
                </li>
                <li>
                  <code>zhCN</code> (String) ―
                  <Sentence lang="en">中国語名</Sentence>
                  <Sentence lang="ja">中国語名</Sentence>
                  <Sentence lang="zh-CN">中国語名</Sentence>
                </li>
                <li>
                  <code>pronunciationJa</code> (String) ―
                  <Sentence lang="en">
                    日本語の読み。ひらがな、カタカナ、記号が含まれます。
                  </Sentence>
                  <Sentence lang="ja">
                    日本語の読み。ひらがな、カタカナ、記号が含まれます。
                  </Sentence>
                  <Sentence lang="zh-CN">
                    日本語の読み。ひらがな、カタカナ、記号が含まれます。
                  </Sentence>
                </li>
                <li>
                  <code>notes</code> (String) ―
                  <Sentence lang="en">
                    備考 (日本語話者向け)。HTML が含まれる場合があります。
                  </Sentence>
                  <Sentence lang="ja">
                    備考 (日本語話者向け)。HTML が含まれる場合があります。
                  </Sentence>
                  <Sentence lang="zh-CN">
                    備考 (日本語話者向け)。HTML が含まれる場合があります。
                  </Sentence>
                </li>
                <li>
                  <code>notesZh</code> (String) ―
                  <Sentence lang="en">
                    備考 (中国語話者向け)。HTML が含まれる場合があります。
                  </Sentence>
                  <Sentence lang="ja">
                    備考 (中国語話者向け)。HTML が含まれる場合があります。
                  </Sentence>
                  <Sentence lang="zh-CN">
                    備考 (中国語話者向け)。HTML が含まれる場合があります。
                  </Sentence>
                </li>
                <li>
                  <code>variants</code> (Object) ―
                  <Sentence lang="en">
                    よくある誤記や通称等。例えば鍾離の誤記「鐘離」や、聖遺物「血染めの騎士道」の略称「血染め」などが含まれます。
                  </Sentence>
                  <Sentence lang="ja">
                    よくある誤記や通称等。例えば鍾離の誤記「鐘離」や、聖遺物「血染めの騎士道」の略称「血染め」などが含まれます。
                  </Sentence>
                  <Sentence lang="zh-CN">
                    よくある誤記や通称等。例えば鍾離の誤記「鐘離」や、聖遺物「血染めの騎士道」の略称「血染め」などが含まれます。
                  </Sentence>
                </li>
                <li>
                  <code>variants.en</code> (string[]) ―
                  <Sentence lang="en">英語の誤記や通称等</Sentence>
                  <Sentence lang="ja">英語の誤記や通称等</Sentence>
                  <Sentence lang="zh-CN">英語の誤記や通称等</Sentence>
                </li>
                <li>
                  <code>variants.ja</code> (string[]) ―
                  <Sentence lang="en">日本語の誤記や通称等</Sentence>
                  <Sentence lang="ja">日本語の誤記や通称等</Sentence>
                  <Sentence lang="zh-CN">日本語の誤記や通称等</Sentence>
                </li>
                <li>
                  <code>examples</code> (Object[]) ―
                  <Sentence lang="en">例文</Sentence>
                  <Sentence lang="ja">例文</Sentence>
                  <Sentence lang="zh-CN">例文</Sentence>
                </li>
                <li>
                  <code>examples[].en</code> (String) ―
                  <Sentence lang="en">例文の英語</Sentence>
                  <Sentence lang="ja">例文の英語</Sentence>
                  <Sentence lang="zh-CN">例文の英語</Sentence>
                </li>
                <li>
                  <code>examples[].ja</code> (String) ―
                  <Sentence lang="en">例文の日本語</Sentence>
                  <Sentence lang="ja">例文の日本語</Sentence>
                  <Sentence lang="zh-CN">例文の日本語</Sentence>
                </li>
                <li>
                  <code>examples[].ref</code> (String) ―
                  <Sentence lang="en">例文の出典</Sentence>
                  <Sentence lang="ja">例文の出典</Sentence>
                  <Sentence lang="zh-CN">例文の出典</Sentence>
                </li>
                <li>
                  <code>examples[].refURL</code> (String) ―
                  <Sentence lang="en">例文の出典のリンク</Sentence>
                  <Sentence lang="ja">例文の出典のリンク</Sentence>
                  <Sentence lang="zh-CN">例文の出典のリンク</Sentence>
                </li>
                <li>
                  <code>createdAt</code> (String) ―
                  <Sentence lang="en">作成日 (yyyy-mm-dd 形式)</Sentence>
                  <Sentence lang="ja">作成日 (yyyy-mm-dd 形式)</Sentence>
                  <Sentence lang="zh-CN">作成日 (yyyy-mm-dd 形式)</Sentence>
                </li>
                <li>
                  <code>updatedAt</code> (String) ―
                  <Sentence lang="en">最終更新日 (yyyy-mm-dd 形式)</Sentence>
                  <Sentence lang="ja">最終更新日 (yyyy-mm-dd 形式)</Sentence>
                  <Sentence lang="zh-CN">最終更新日 (yyyy-mm-dd 形式)</Sentence>
                </li>
                <li>
                  <code>tags</code> (String[]) ―
                  <Sentence lang="en">タグ。タグは以下の種類が存在します:</Sentence>
                  <Sentence lang="ja">タグ。タグは以下の種類が存在します:</Sentence>
                  <Sentence lang="zh-CN">タグ。タグは以下の種類が存在します:</Sentence>

                  <ul>
                    { Object.entries(allTags).map(([ tagID, tag ]) => (
                      <li key={ tagID }>
                        <code>{ tagID }</code> ― { tag[locale] }
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <h4>
                <Sentence lang="en">互換性</Sentence>
                <Sentence lang="ja">互換性</Sentence>
                <Sentence lang="zh-CN">互換性</Sentence>
              </h4>
              <p>
                <Sentence lang="en">
                  本データは現在β版です。予告なく破壊的変更が入る可能性もありますので、ご了承下さい。<br />
                  可能であれば、アクセス毎に JSON を本サイトから取得することは避け、例えば Next.js や Nuxt.js などのプリレンダリングの仕組みを用いるなどして、ビルド時にデータを取得し HTML に予め埋め込む方式での実装を推奨します。
                </Sentence>
                <Sentence lang="ja">
                  本データは現在β版です。予告なく破壊的変更が入る可能性もありますので、ご了承下さい。<br />
                  可能であれば、アクセス毎に JSON を本サイトから取得することは避け、例えば Next.js や Nuxt.js などのプリレンダリングの仕組みを用いるなどして、ビルド時にデータを取得し HTML に予め埋め込む方式での実装を推奨します。
                </Sentence>
                <Sentence lang="zh-CN">
                  本データは現在β版です。予告なく破壊的変更が入る可能性もありますので、ご了承下さい。<br />
                  可能であれば、アクセス毎に JSON を本サイトから取得することは避け、例えば Next.js や Nuxt.js などのプリレンダリングの仕組みを用いるなどして、ビルド時にデータを取得し HTML に予め埋め込む方式での実装を推奨します。
                </Sentence>
              </p>

              <h3>
                <Sentence lang="en">利用上の注意</Sentence>
                <Sentence lang="ja">利用上の注意</Sentence>
                <Sentence lang="zh-CN">利用上の注意</Sentence>
              </h3>
              <p>
                <Sentence lang="en">最終更新: 2022年1月3日</Sentence>
                <Sentence lang="ja">最終更新: 2022年1月3日</Sentence>
                <Sentence lang="zh-CN">最終更新: 2022年1月3日</Sentence>
              </p>
              <ul>
                <li>
                  <Sentence lang="en">
                    当サイトの配布する CSV 及び JSON の日英対訳データ (以下「本データ」) は、自由に加工し掲載・再配布することができます。
                  </Sentence>
                  <Sentence lang="ja">
                    当サイトの配布する CSV 及び JSON の日英対訳データ (以下「本データ」) は、自由に加工し掲載・再配布することができます。
                  </Sentence>
                  <Sentence lang="zh-CN">
                    当サイトの配布する CSV 及び JSON の日英対訳データ (以下「本データ」) は、自由に加工し掲載・再配布することができます。
                  </Sentence>
                </li>
                <li>
                  <Sentence lang="en">
                    本データの出典として、当サイトのサイト名や URL などを表示する義務はありません。(勿論、表示して頂いても構いません。)
                  </Sentence>
                  <Sentence lang="ja">
                    本データの出典として、当サイトのサイト名や URL などを表示する義務はありません。(勿論、表示して頂いても構いません。)
                  </Sentence>
                  <Sentence lang="zh-CN">
                    本データの出典として、当サイトのサイト名や URL などを表示する義務はありません。(勿論、表示して頂いても構いません。)
                  </Sentence>
                </li>
                <li>
                  <Sentence lang="en">
                    以下の場合、本データの利用許可は取り消されます。利用許可の取り消しによって、本データ又は本データを加工して作成した成果物を掲載・再配布する権利があなたから失われる場合、速やかに掲載・再配布を停止しなければなりません。                  </Sentence>
                  <Sentence lang="ja">
                    以下の場合、本データの利用許可は取り消されます。利用許可の取り消しによって、本データ又は本データを加工して作成した成果物を掲載・再配布する権利があなたから失われる場合、速やかに掲載・再配布を停止しなければなりません。                  </Sentence>
                  <Sentence lang="zh-CN">
                    以下の場合、本データの利用許可は取り消されます。利用許可の取り消しによって、本データ又は本データを加工して作成した成果物を掲載・再配布する権利があなたから失われる場合、速やかに掲載・再配布を停止しなければなりません。
                  </Sentence>

                  <ul>
                    <li>
                      <Sentence lang="en">
                        本データを掲載・再配布することで、Hoyoverse 運営各社 (COGNOSPHERE PTE. LTD.、上海米哈游網絡科技股份有限公司、株式会社 miHoYo、その他各国支社・子会社) やその他の第三者の権利を侵害する場合
                      </Sentence>
                      <Sentence lang="ja">
                        本データを掲載・再配布することで、Hoyoverse 運営各社 (COGNOSPHERE PTE. LTD.、上海米哈游網絡科技股份有限公司、株式会社 miHoYo、その他各国支社・子会社) やその他の第三者の権利を侵害する場合
                      </Sentence>
                      <Sentence lang="zh-CN">
                        本データを掲載・再配布することで、Hoyoverse 運営各社 (COGNOSPHERE PTE. LTD.、上海米哈游網絡科技股份有限公司、株式会社 miHoYo、その他各国支社・子会社) やその他の第三者の権利を侵害する場合
                      </Sentence>
                    </li>
                    <li>
                      <Sentence lang="en">
                        本データを掲載・再配布することで、原神や関連サービス (HoYoLab など) の利用規約に違反する場合
                      </Sentence>
                      <Sentence lang="ja">
                        本データを掲載・再配布することで、原神や関連サービス (HoYoLab など) の利用規約に違反する場合
                      </Sentence>
                      <Sentence lang="zh-CN">
                        本データを掲載・再配布することで、原神や関連サービス (HoYoLab など) の利用規約に違反する場合
                      </Sentence>
                    </li>
                    <li>
                      <Sentence lang="en">
                        本データを掲載・再配布することで、日本法又はあなたの居住国の法令に違反する場合
                      </Sentence>
                      <Sentence lang="ja">
                        本データを掲載・再配布することで、日本法又はあなたの居住国の法令に違反する場合
                      </Sentence>
                      <Sentence lang="zh-CN">
                        本データを掲載・再配布することで、日本法又はあなたの居住国の法令に違反する場合
                      </Sentence>
                    </li>
                    <li>
                      <Sentence lang="en">
                        当サイトの運営者が本データの利用停止を求めた場合
                      </Sentence>
                      <Sentence lang="ja">
                        当サイトの運営者が本データの利用停止を求めた場合
                      </Sentence>
                      <Sentence lang="zh-CN">
                        当サイトの運営者が本データの利用停止を求めた場合
                      </Sentence>
                    </li>
                  </ul>
                </li>
                <li>
                  <Sentence lang="en">
                    本データの利用・加工・掲載・再配布に伴い、あなたや第三者に何らかの損害が生じた場合、当サイトの運営者は一切の責任を負いません。
                  </Sentence>
                  <Sentence lang="ja">
                    本データの利用・加工・掲載・再配布に伴い、あなたや第三者に何らかの損害が生じた場合、当サイトの運営者は一切の責任を負いません。
                  </Sentence>
                  <Sentence lang="zh-CN">
                    本データの利用・加工・掲載・再配布に伴い、あなたや第三者に何らかの損害が生じた場合、当サイトの運営者は一切の責任を負いません。
                  </Sentence>
                </li>
              </ul>
              <p>
                <Sentence lang="en">
                  ご不明点があれば、<a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a> にてお問い合わせ下さい。(フォロー外から DM をお送り頂くことも可能です。)
                </Sentence>
                <Sentence lang="ja">
                  ご不明点があれば、<a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a> にてお問い合わせ下さい。(フォロー外から DM をお送り頂くことも可能です。)
                </Sentence>
                <Sentence lang="zh-CN">
                  ご不明点があれば、<a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a> にてお問い合わせ下さい。(フォロー外から DM をお送り頂くことも可能です。)
                </Sentence>
              </p>
            </main>
          </Article>
        </div>
      </div>
    </>
  );
}
