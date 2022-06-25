<template>
  <div class="article__wrapper-outer">
    <div class="article__wrapper-inner">
      <h2>このサイトについて</h2>

      <main>
        <p>
          このサイトは PC・スマートフォン・プレイステーション4/5用ゲーム「<a href="https://genshin.hoyoverse.com" target="_blank" rel="noopener">原神</a>」で用いられる固有名詞等の日本語・英語対訳表です。
        </p>
        <p>現在の収録単語数は{{ wordCount }}語です。</p>

        <h3>ご利用にあたっての注意・免責事項</h3>
        <p>本サイトはゲームの固有名詞等の対訳を掲載している都合上、意訳が多く、一般的な意味とは訳が異なる場合がありますので、ご注意下さい。</p>
        <p>
          読み仮名は検索精度の向上を目的として付けており、その正確性について十分な調査をしておりません。間違いが多く含まれる可能性があることをご了承下さい。読み仮名について、より正確な情報を収集されたい場合、<a href="http://anemoarchon.s205.xrea.com/#/gdic" target="_blank" rel="noopener">原神用語辞書</a>の<a href="http://anemoarchon.s205.xrea.com/#/gdic/list" target="_blank" rel="noopener">収録単語確認ページ</a>を参照されることをおすすめします。
        </p>
        <p>
          このサイトは一プレイヤーが運営しているファンサイトであり、開発元である Hoyoverse (Cognosphere 社・miHoYo 社)とは関係ありません。
        </p>

        <h3 id="opendata">
          オープンデータ・API (β)
        </h3>
        <p>
          本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。<br>
          詳細は<a href="/opendata/">オープンデータ・API についてのページ</a>をご確認下さい。
        </p>

        <h3>運営者・貢献者</h3>
        <ul>
          <li>運営者: ふぉる (<a href="https://twitter.com/phol_si" target="_blank" rel="noopener">Twitter</a> / <a href="https://github.com/xicri" target="_blank" rel="noopener">GitHub</a>)</li>
          <li>中国語翻訳データ作成: Bill Haku (<a href="https://twitter.com/Haku_Bill" target="_blank" rel="noopener">Twitter</a> / <a href="https://github.com/Bill-Haku" target="_blank" rel="noopener">GitHub</a>)</li>
        </ul>

        <p>
          お問い合わせなどの際は <a href="https://twitter.com/phol_si" target="_blank" rel="noopener">Twitter</a> からご連絡下さい。(DM 可)<br>
          バグ報告やオープンデータ・API 関連、その他技術的なお問い合わせについては、GitHub の <a href="https://github.com/xicri/genshin-dictionary/issues" target="_blank" rel="noopener">Issues</a> や <a href="https://github.com/xicri/genshin-dictionary/discussions" target="_blank" rel="noopener">Discussions</a> からお問い合わせ頂いても構いません。<br>
          お問い合わせの際は、できるだけ日本語又は英語でお願いします。
        </p>

        <h3 id="credits">
          クレジット
        </h3>
        <p>
          本サイトの読み仮名データの一部は、<a href="http://anemoarchon.s205.xrea.com/#/gdic" target="_blank" rel="noopener">原神用語辞書</a>を参照しています。
        </p>
        <p>
          本サイトの単語は、原則としてゲームや公式から配信される YouTube 動画、ツイート等を参照していますが、聖遺物など一部の単語については <a href="https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki" target="_blank" rel="noopener">Genshin Impact Wiki (Fandom)</a> を参照しています。
        </p>
        <p>
          本サイトは GitHub 社により <a href="https://github.com/primer/octicons/blob/main/LICENSE" target="_blank" rel="noopener">MIT ライセンス</a>にて提供されている <a href="https://primer.style/octicons/" target="_blank" rel="noopener">Octicons</a> を利用しています。
        </p>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent, useAsync, useMeta } from "@nuxtjs/composition-api";
import words from "~/static/dataset/words.json";

export default defineComponent({
  setup() {
    const title = "このサイトについて | 原神 英語・中国語辞典";

    useMeta({
      title,
      meta: [
        { hid: "og:title", property: "og:title", content: title },
      ],
    });

    const wordCount = useAsync(() => words.length);

    return {
      wordCount,
    };
  },
  head: {},
});
</script>

<style lang="scss" src="~/assets/styles/articles.scss" scoped></style>
