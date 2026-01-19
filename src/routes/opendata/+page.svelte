<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime.js";
  import tags from "$lib/dataset/tags.json";
  import type { Locale } from "$lib/types.ts";

  const locale = getLocale();
  const title = `${ m.opendataTitle() } | ${ m.siteTitle() }`;

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

  const downloadLink = m.jsonUrlText({
    url: "<a href=\"https://dataset.genshin-dictionary.com/words.json\" target=\"_blank\" rel=\"noopener\">https://dataset.genshin-dictionary.com/words.json</a>",
  });

  const contactText = m.contactText({
    blueskyLink: "<a href=\"https://bsky.app/profile/xicri.genshin-dictionary.com\" target=\"_blank\" rel=\"noopener\">Bluesky</a>",
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<style lang="scss" src="~/assets/styles/articles.scss"></style>

<div class="article__wrapper-outer">
  <div class="article__wrapper-inner">
    <h2>{ m.opendataTitle() }</h2>

    <main>
      <p>{ m.introText() }</p>

      <h3>{ m.csvTitle() }</h3>
      <ul>
        <li>
          <a href="https://dataset.genshin-dictionary.com/words.csv" target="_blank">
            { m.csvDownloadUtf8() }
          </a>
        </li>
        <li>
          <a href="https://dataset.genshin-dictionary.com/words-sjis.csv" target="_blank">
            { m.csvDownloadShiftJis() }
          </a>
        </li>
      </ul>
      {#if locale === "ja"}
        <p>
          Excel を用いて CSV を開く場合は、Shift_JIS 版の利用を推奨します。UTF-8 版を用いると文字化けする可能性があります。<br />
          その他のソフトウェアを用いる場合についても、文字化けが発生する場合は UTF-8 版と Shift_JIS 版の両方を試してみて下さい。
        </p>
      {/if}

      <h3>{ m.jsonTitle() }</h3>

      <h4>{ m.jsonUrlTitle() }</h4>
      <p>
        {@html downloadLink}
      </p>

      <h4>{ m.jsonFormatTitle() }</h4>
      <p>{ m.jsonFormatText() }</p>
      <code>
        <pre>{ jsonExample }</pre>
      </code>

      <p>{ m.propertyTitle() }</p>
      <ul>
        <li><code>id</code> ― { m.propertyId() }</li>
        <li><code>en</code> ― { m.propertyEn() }</li>
        <li><code>ja</code> ― { m.propertyJa() }</li>
        <li><code>zhCN</code> ― { m.propertyZhCN() }</li>
        <li><code>pronunciationJa</code> ― { m.propertyPronunciationJa() }</li>
        <li><code>notes</code> ― { m.propertyNotes() }</li>
        <li><code>notesZh</code> ― { m.propertyNotesZh() }</li>
        <li><code>notesZhTW</code> ― { m.propertyNotesZhTW() }</li>
        <li><code>variants</code> ― { m.propertyVariants() }</li>
        <li><code>variants.en</code> ― { m.propertyVariantsEn() }</li>
        <li><code>variants.ja</code> ― { m.propertyVariantsJa() }</li>
        <li><code>examples</code> ― { m.propertyExamples() }</li>
        <li><code>examples[].en</code> ― { m.propertyExamplesEn() }</li>
        <li><code>examples[].ja</code> ― { m.propertyExamplesJa() }</li>
        <li><code>examples[].ref</code> ― { m.propertyExamplesRef() }</li>
        <li><code>examples[].refURL</code> ― { m.propertyExamplesRefURL() }</li>
        <li><code>createdAt</code> ― { m.propertyCreatedAt() }</li>
        <li><code>updatedAt</code> ― { m.propertyUpdatedAt() }</li>
        <li>
          <code>tags</code> ― { m.propertyTags() }
          <ul>
            {#each Object.entries(tags) as [ tagID, tag ] (tagID)}
              <li>
                <code>{ tagID }</code> ― { tag[locale as Locale] }
              </li>
            {/each}
          </ul>
        </li>
      </ul>

      <h4>{ m.compatibilityTitle() }</h4>
      <p>{ m.compatibilityText() }</p>

      <h3>{ m.usageNotesTitle() }</h3>
      <p>{ m.lastUpdated() }</p>
      <ul class="usage-notes">
        <li>{ m.usageNotesBasic() }</li>
        <li>{ m.usageNotesCitation() }</li>
        <li>
          { m.usageNotesRevocationIntro() }
          <ul>
            <li>{ m.usageNotesRevocationRights() }</li>
            <li>{ m.usageNotesRevocationTerms() }</li>
            <li>{ m.usageNotesRevocationLaws() }</li>
            <li>{ m.usageNotesRevocationRequest() }</li>
          </ul>
        </li>
        <li>{ m.usageNotesDisclaimer() }</li>
      </ul>
      <p>
        {@html contactText}
      </p>
    </main>
  </div>
</div>
