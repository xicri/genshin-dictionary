import Head from "next/head";
import { I18n, validateLocale } from "@/libs/i18n";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { Locale } from "@/types";
import { Sentence } from "@/components/Sentence";
import { Article } from "@/components/Article";
import allWords from "../../public/dataset/words.json";
import { styles } from "@/styles/article";

type Props = {
  locale: Locale,
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale }) => ({
  props: {
    locale: validateLocale(locale),
  },
});

export default function AboutPage({ locale }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const i18n = new I18n(locale, {
    en: {
      aboutTitle: "About this website",
      aboutDescription: "About Genshin Dictionary. This website is an online English-Chinese-Japanese dictionary of the terms in Genshin Impact.",
    },
    ja: {
      aboutTitle: "このサイトについて",
      aboutDescription: "原神英語・中国語辞典についての説明です。このサイトは PC・スマートフォン・プレイステーション4/5用ゲーム「原神」で用いられる固有名詞等の日本語・英語・中国語対訳表です。",
    },
    "zh-CN": {
      aboutTitle: "关于本网站",
      aboutDescription: "关于原神中英日辞典。本网站是一个在线的中英日三语原神游戏用语辞典。",
    },
  });

  const title = `${ i18n.t("aboutTitle") } | ${ i18n.t("siteTitle") }`;
  const description = i18n.t("aboutDescription");

  const wordCount = allWords.length;

  return (
    <>
      <style jsx>{ styles }</style>

      <Head>
        <title>{ title }</title>
        <meta property="og:title" content={ title } />
        <meta name="description" content={ description } />
        <meta property="og:description" content={ description } />
        { locale !== "ja" ? (<meta name="robots" content="noindex" />) : "" }
      </Head>

      <div className="article__wrapper-outer">
        <div className="article__wrapper-inner">
          <Article locale={locale}>
            <h2>{ i18n.t("aboutTitle") }</h2>

            <main>
              { locale !== "ja" ? (
                <p>
                  <strong>This page is not translated to English/Simplified Chinese yet.</strong>
                </p>
              ) : "" }
              <p>
                <Sentence lang="en">
                  このサイトは PC・スマートフォン・プレイステーション4/5用ゲーム「<a href="https://genshin.hoyoverse.com" target="_blank" rel="noopener">原神</a>」で用いられる固有名詞等の日本語・英語・中国語対訳表です。
                </Sentence>
                <Sentence lang="ja">
                  このサイトは PC・スマートフォン・プレイステーション4/5用ゲーム「<a href="https://genshin.hoyoverse.com" target="_blank" rel="noopener">原神</a>」で用いられる固有名詞等の日本語・英語・中国語対訳表です。
                </Sentence>
                <Sentence lang="zh-CN">
                  このサイトは PC・スマートフォン・プレイステーション4/5用ゲーム「<a href="https://genshin.hoyoverse.com" target="_blank" rel="noopener">原神</a>」で用いられる固有名詞等の日本語・英語・中国語対訳表です。
                </Sentence>
              </p>
              <p>
                <Sentence lang="en">現在の収録単語数は{ wordCount }語です。</Sentence>
                <Sentence lang="ja">現在の収録単語数は{ wordCount }語です。</Sentence>
                <Sentence lang="zh-CN">現在の収録単語数は{ wordCount }語です。</Sentence>
              </p>

              <h3>
                <Sentence lang="en">ご利用にあたっての注意・免責事項</Sentence>
                <Sentence lang="ja">ご利用にあたっての注意・免責事項</Sentence>
                <Sentence lang="zh-CN">ご利用にあたっての注意・免責事項</Sentence>
              </h3>
              <p>
                <Sentence lang="en">
                  本サイトはゲームの固有名詞等の対訳を掲載している都合上、意訳が多く、一般的な意味とは訳が異なる場合がありますので、ご注意下さい。
                </Sentence>
                <Sentence lang="ja">
                  本サイトはゲームの固有名詞等の対訳を掲載している都合上、意訳が多く、一般的な意味とは訳が異なる場合がありますので、ご注意下さい。
                </Sentence>
                <Sentence lang="zh-CN">
                  本サイトはゲームの固有名詞等の対訳を掲載している都合上、意訳が多く、一般的な意味とは訳が異なる場合がありますので、ご注意下さい。
                </Sentence>
              </p>
              <p>
                <Sentence lang="en">
                  読み仮名は検索精度の向上を目的として付けており、その正確性について十分な調査をしておりません。間違いが多く含まれる可能性があることをご了承下さい。読み仮名について、より正確な情報を収集されたい場合、<a href="http://anemoarchon.s205.xrea.com/#/gdic" target="_blank" rel="noopener">原神用語辞書</a>の<a href="http://anemoarchon.s205.xrea.com/#/gdic/list" target="_blank" rel="noopener">収録単語確認ページ</a>を参照されることをおすすめします。                </Sentence>
                <Sentence lang="ja">
                  読み仮名は検索精度の向上を目的として付けており、その正確性について十分な調査をしておりません。間違いが多く含まれる可能性があることをご了承下さい。読み仮名について、より正確な情報を収集されたい場合、<a href="http://anemoarchon.s205.xrea.com/#/gdic" target="_blank" rel="noopener">原神用語辞書</a>の<a href="http://anemoarchon.s205.xrea.com/#/gdic/list" target="_blank" rel="noopener">収録単語確認ページ</a>を参照されることをおすすめします。                </Sentence>
                <Sentence lang="zh-CN">
                  読み仮名は検索精度の向上を目的として付けており、その正確性について十分な調査をしておりません。間違いが多く含まれる可能性があることをご了承下さい。読み仮名について、より正確な情報を収集されたい場合、<a href="http://anemoarchon.s205.xrea.com/#/gdic" target="_blank" rel="noopener">原神用語辞書</a>の<a href="http://anemoarchon.s205.xrea.com/#/gdic/list" target="_blank" rel="noopener">収録単語確認ページ</a>を参照されることをおすすめします。                </Sentence>
              </p>
              <p>
                <Sentence lang="en">
                  このサイトは一プレイヤーが運営しているファンサイトであり、開発元である HoYoverse (Cognosphere 社・miHoYo 社)とは関係ありません。
                </Sentence>
                <Sentence lang="ja">
                  このサイトは一プレイヤーが運営しているファンサイトであり、開発元である HoYoverse (Cognosphere 社・miHoYo 社)とは関係ありません。
                </Sentence>
                <Sentence lang="zh-CN">
                  このサイトは一プレイヤーが運営しているファンサイトであり、開発元である HoYoverse (Cognosphere 社・miHoYo 社)とは関係ありません。
                </Sentence>
              </p>

              <h3 id="opendata">
                <Sentence lang="en">オープンデータ・API (β)</Sentence>
                <Sentence lang="ja">オープンデータ・API (β)</Sentence>
                <Sentence lang="zh-CN">オープンデータ・API (β)</Sentence>

              </h3>
              <p>
                <Sentence lang="en">
                  本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。
                </Sentence>
                <Sentence lang="ja">
                  本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。
                </Sentence>
                <Sentence lang="zh-CN">
                  本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。
                </Sentence>
                <br />
                <Sentence lang="en">
                  詳細は<a href={`/${locale}/opendata/`}>オープンデータ・API についてのページ</a>をご確認下さい。
                </Sentence>
                <Sentence lang="ja">
                  詳細は<a href={`/${locale}/opendata/`}>オープンデータ・API についてのページ</a>をご確認下さい。
                </Sentence>
                <Sentence lang="zh-CN">
                  詳細は<a href={`/${locale}/opendata/`}>オープンデータ・API についてのページ</a>をご確認下さい。
                </Sentence>
              </p>

              <h3>
                <Sentence lang="en">運営者・貢献者</Sentence>
                <Sentence lang="ja">運営者・貢献者</Sentence>
                <Sentence lang="zh-CN">運営者・貢献者</Sentence>
              </h3>
              <ul>
                <li>
                  <Sentence lang="en">運営者: シクリ</Sentence>
                  <Sentence lang="ja">運営者: シクリ</Sentence>
                  <Sentence lang="zh-CN">運営者: シクリ</Sentence>
                  &nbsp;(<a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a> / <a href="https://github.com/xicri" target="_blank" rel="noopener">GitHub</a>)
                </li>
                <li>
                  <Sentence lang="en">中国語翻訳データ作成: Bill Haku</Sentence>
                  <Sentence lang="ja">中国語翻訳データ作成: Bill Haku</Sentence>
                  <Sentence lang="zh-CN">中国語翻訳データ作成: Bill Haku</Sentence>
                  &nbsp;(<a href="https://space.bilibili.com/158463764" target="_blank" rel="noopener">BiliBili</a> / <a href="https://twitter.com/Haku_Bill" target="_blank" rel="noopener">Twitter</a> / <a href="https://github.com/Bill-Haku" target="_blank" rel="noopener">GitHub</a>)
                </li>
              </ul>

              <p>
                <Sentence lang="en">
                  お問い合わせなどの際は <a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a> からご連絡下さい。(DM 可)
                </Sentence>
                <Sentence lang="ja">
                  お問い合わせなどの際は <a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a> からご連絡下さい。(DM 可)
                </Sentence>
                <Sentence lang="zh-CN">
                  お問い合わせなどの際は <a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a> からご連絡下さい。(DM 可)
                </Sentence>
                <br />
                <Sentence lang="en">
                  バグ報告やオープンデータ・API 関連、その他技術的なお問い合わせについては、GitHub の <a href="https://github.com/xicri/genshin-dictionary/issues" target="_blank" rel="noopener">Issues</a> や <a href="https://github.com/xicri/genshin-dictionary/discussions" target="_blank" rel="noopener">Discussions</a> からお問い合わせ頂いても構いません。
                </Sentence>
                <Sentence lang="ja">
                  バグ報告やオープンデータ・API 関連、その他技術的なお問い合わせについては、GitHub の <a href="https://github.com/xicri/genshin-dictionary/issues" target="_blank" rel="noopener">Issues</a> や <a href="https://github.com/xicri/genshin-dictionary/discussions" target="_blank" rel="noopener">Discussions</a> からお問い合わせ頂いても構いません。
                </Sentence>
                <Sentence lang="zh-CN">
                  バグ報告やオープンデータ・API 関連、その他技術的なお問い合わせについては、GitHub の <a href="https://github.com/xicri/genshin-dictionary/issues" target="_blank" rel="noopener">Issues</a> や <a href="https://github.com/xicri/genshin-dictionary/discussions" target="_blank" rel="noopener">Discussions</a> からお問い合わせ頂いても構いません。
                </Sentence>
                <br />
                <Sentence lang="en">
                  お問い合わせの際は、できるだけ日本語又は英語でお願いします。
                </Sentence>
                <Sentence lang="ja">
                  お問い合わせの際は、できるだけ日本語又は英語でお願いします。
                </Sentence>
                <Sentence lang="zh-CN">
                  お問い合わせの際は、できるだけ日本語又は英語でお願いします。
                </Sentence>
              </p>

              <h3 id="credits">
                <Sentence lang="en">クレジット</Sentence>
                <Sentence lang="ja">クレジット</Sentence>
                <Sentence lang="zh-CN">クレジット</Sentence>
              </h3>
              <p>
                <Sentence lang="en">
                  本サイトの読み仮名データの一部は、<a href="http://anemoarchon.s205.xrea.com/#/gdic" target="_blank" rel="noopener">原神用語辞書</a>及び<a href="https://twitter.com/genshin_kanji" target="_blank" rel="noopener">原神漢字研究所</a>を参照しています。
                </Sentence>
                <Sentence lang="ja">
                  本サイトの読み仮名データの一部は、<a href="http://anemoarchon.s205.xrea.com/#/gdic" target="_blank" rel="noopener">原神用語辞書</a>及び<a href="https://twitter.com/genshin_kanji" target="_blank" rel="noopener">原神漢字研究所</a>を参照しています。
                </Sentence>
                <Sentence lang="zh-CN">
                  本サイトの読み仮名データの一部は、<a href="http://anemoarchon.s205.xrea.com/#/gdic" target="_blank" rel="noopener">原神用語辞書</a>及び<a href="https://twitter.com/genshin_kanji" target="_blank" rel="noopener">原神漢字研究所</a>を参照しています。
                </Sentence>
              </p>
              <p>
                <Sentence lang="en">
                  本サイトの単語は、原則としてゲームや公式から配信される YouTube 動画、ツイート等を参照していますが、聖遺物など一部の単語については <a href="https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki" target="_blank" rel="noopener">Genshin Impact Wiki (Fandom)</a> を参照しています。
                </Sentence>
                <Sentence lang="ja">
                  本サイトの単語は、原則としてゲームや公式から配信される YouTube 動画、ツイート等を参照していますが、聖遺物など一部の単語については <a href="https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki" target="_blank" rel="noopener">Genshin Impact Wiki (Fandom)</a> を参照しています。
                </Sentence>
                <Sentence lang="zh-CN">
                  本サイトの単語は、原則としてゲームや公式から配信される YouTube 動画、ツイート等を参照していますが、聖遺物など一部の単語については <a href="https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki" target="_blank" rel="noopener">Genshin Impact Wiki (Fandom)</a> を参照しています。
                </Sentence>
              </p>
              <p>
                <Sentence lang="en">
                  本サイトは GitHub 社により <a href="https://github.com/primer/octicons/blob/main/LICENSE" target="_blank" rel="noopener">MIT ライセンス</a>にて提供されている <a href="https://primer.style/octicons/" target="_blank" rel="noopener">Octicons</a> を利用しています。
                </Sentence>
                <Sentence lang="ja">
                  本サイトは GitHub 社により <a href="https://github.com/primer/octicons/blob/main/LICENSE" target="_blank" rel="noopener">MIT ライセンス</a>にて提供されている <a href="https://primer.style/octicons/" target="_blank" rel="noopener">Octicons</a> を利用しています。
                </Sentence>
                <Sentence lang="zh-CN">
                  本サイトは GitHub 社により <a href="https://github.com/primer/octicons/blob/main/LICENSE" target="_blank" rel="noopener">MIT ライセンス</a>にて提供されている <a href="https://primer.style/octicons/" target="_blank" rel="noopener">Octicons</a> を利用しています。
                </Sentence>
              </p>
              <p>
                <Sentence lang="en">
                  本サイトの favicon の一部には<a href="http://www.fontna.com/blog/1226/" target="_blank" rel="noopener">ロゴたいぷゴシック</a>を利用しています。
                </Sentence>
                <Sentence lang="ja">
                  本サイトの favicon の一部には<a href="http://www.fontna.com/blog/1226/" target="_blank" rel="noopener">ロゴたいぷゴシック</a>を利用しています。
                </Sentence>
                <Sentence lang="zh-CN">
                  本サイトの favicon の一部には<a href="http://www.fontna.com/blog/1226/" target="_blank" rel="noopener">ロゴたいぷゴシック</a>を利用しています。
                </Sentence>
              </p>
            </main>
          </Article>
        </div>
      </div>
    </>
  );
}
