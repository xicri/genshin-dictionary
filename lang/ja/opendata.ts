export default {
    notTranslated: "このページは英語/簡体字中国語に完全には翻訳されていません。",
    introText: "本サイトの対訳表データは CSV 形式 (一般向け) 及び JSON 形式 (技術者向け) で配布しています。データは、基本的に自由に加工し掲載・再配布して頂いて構いません。(詳細は利用上の注意の項をお読み下さい)",
    
    csvTitle: "CSV (一般向け)",
    csvDownloadUtf8: "CSV (UTF-8 版) をダウンロード",
    csvDownloadShiftJis: "CSV (Shift_JIS 版) をダウンロード",
    csvNote: "Excel を用いて CSV を開く場合は、Shift_JIS 版の利用を推奨します。UTF-8 版を用いると文字化けする可能性があります。\nその他のソフトウェアを用いる場合についても、文字化けが発生する場合は UTF-8 版と Shift_JIS 版の両方を試してみて下さい。",
  
    jsonTitle: "JSON (技術者向け)",
    jsonUrlTitle: "データ URL",
    jsonUrlText: "{url} からデータを取得できます。",
    jsonFormatTitle: "データ形式",
    jsonFormatText: "JSON は以下の例のように、オブジェクトの配列になっています。",
  
    propertyTitle: "各オブジェクトのプロパティは以下の通りです:",
    propertyId: "各単語を一意に示す ID。https://genshin-dictionary.com/[ ID ]/ にアクセスすると、本サイトの当該単語のページを表示できます。時折予告なく変更される場合があるため、注意して下さい。",
    propertyEn: "英語名",
    propertyJa: "日本語名",
    propertyZhCN: "中国語名",
    propertyPronunciationJa: "日本語の読み。ひらがな、カタカナ、記号が含まれます。",
    propertyNotes: "備考 (日本語話者向け)。HTML が含まれる場合があります。",
    propertyNotesZh: "備考 (中国語話者向け)。HTML が含まれる場合があります。",
    propertyVariants: "よくある誤記や通称等。例えば鍾離の誤記「鐘離」や、聖遺物「血染めの騎士道」の略称「血染め」などが含まれます。",
    propertyVariantsEn: "英語の誤記や通称等",
    propertyVariantsJa: "日本語の誤記や通称等",
    propertyExamples: "例文",
    propertyExamplesEn: "例文の英語",
    propertyExamplesJa: "例文の日本語",
    propertyExamplesRef: "例文の出典",
    propertyExamplesRefURL: "例文の出典のリンク",
    propertyCreatedAt: "作成日 (yyyy-mm-dd 形式)",
    propertyUpdatedAt: "最終更新日 (yyyy-mm-dd 形式)",
    propertyTags: "タグ。タグは以下の種類が存在します:",
  
    compatibilityTitle: "互換性",
    compatibilityText: "本データは現在β版です。予告なく破壊的変更が入る可能性もありますので、ご了承下さい。",
  
    usageNotesTitle: "利用上の注意",
    lastUpdated: "最終更新: 2022年1月3日",

    usageNotes: {
        basic: "当サイトの配布する CSV 及び JSON の日英対訳データ (以下「本データ」) は、自由に加工し掲載・再配布することができます。",
        citation: "本データの出典として、当サイトのサイト名や URL などを表示する義務はありません。(勿論、表示して頂いても構いません。)",
        revocation: {
          intro: "以下の場合、本データの利用許可は取り消されます。利用許可の取り消しによって、本データ又は本データを加工して作成した成果物を掲載・再配布する権利があなたから失われる場合、速やかに掲載・再配布を停止しなければなりません。",
          rights: "本データを掲載・再配布することで、Hoyoverse 運営各社 (COGNOSPHERE PTE. LTD.、上海米哈游網絡科技股份有限公司、株式会社 miHoYo、その他各国支社・子会社) やその他の第三者の権利を侵害する場合",
          terms: "本データを掲載・再配布することで、原神や関連サービス (HoYoLab など) の利用規約に違反する場合",
          laws: "本データを掲載・再配布することで、日本法又はあなたの居住国の法令に違反する場合",
          request: "当サイトの運営者が本データの利用停止を求めた場合"
        },
        disclaimer: "本データの利用・加工・掲載・再配布に伴い、あなたや第三者に何らかの損害が生じた場合、当サイトの運営者は一切の責任を負いません。"
    },
    
    contactText: "ご不明点があれば、{twitterLink} にてお問い合わせ下さい。(フォロー外から DM をお送り頂くことも可能です。)",
} as const;