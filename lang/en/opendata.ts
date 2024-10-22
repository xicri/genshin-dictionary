export default {
    introText: "The translation data from this site is available in CSV format (for general users) and JSON format (for developers). You may freely process, publish, and redistribute the data. (Please refer to the Usage Notes section for details)",
    
    csvTitle: "CSV (For General Users)",
    csvDownloadUtf8: "Download CSV (UTF-8 version)",
    csvDownloadShiftJis: "Download CSV (Shift_JIS version)",
    csvNote: "When opening CSV files in Excel, the Shift_JIS version is recommended. The UTF-8 version may cause character encoding issues.\nFor other software, if you encounter character encoding issues, please try both UTF-8 and Shift_JIS versions.",

    jsonTitle: "JSON (For Developers)",
    jsonUrlTitle: "Data URL",
    jsonUrlText: "Data can be retrieved from {url}",
    jsonFormatTitle: "Data Format",
    jsonFormatText: "The JSON consists of an array of objects as shown in the following example:",

    propertyTitle: "Each object has the following properties:",
    propertyId: "Unique ID for each word. You can access the word's page on this site at https://genshin-dictionary.com/[ ID ]/. Please note that this may change without notice.",
    propertyEn: "English name",
    propertyJa: "Japanese name",
    propertyZhCN: "Chinese name",
    propertyPronunciationJa: "Japanese reading (in hiragana, katakana, and symbols)",
    propertyNotes: "Notes (for Japanese speakers). May contain HTML.",
    propertyNotesZh: "Notes (for Chinese speakers). May contain HTML.",
    propertyVariants: "Common misspellings and alternate names. For example, the misspelling '鐘離' for Zhongli, or the abbreviation '血染め' for 'Bloodstained Chivalry'.",
    propertyVariantsEn: "English misspellings and alternate names",
    propertyVariantsJa: "Japanese misspellings and alternate names",
    propertyExamples: "Example sentences",
    propertyExamplesEn: "Example sentence in English",
    propertyExamplesJa: "Example sentence in Japanese",
    propertyExamplesRef: "Source of the example",
    propertyExamplesRefURL: "Link to the source",
    propertyCreatedAt: "Creation date (yyyy-mm-dd format)",
    propertyUpdatedAt: "Last update date (yyyy-mm-dd format)",
    propertyTags: "Tags. The following tags exist:",

    compatibilityTitle: "Compatibility",
    compatibilityText: "This data is currently in beta. Please be aware that there may be breaking changes without notice.",

    usageNotesTitle: "Usage Notes",
    lastUpdated: "Last updated: January 3, 2022",
    usageNotes: {
        basic: "The CSV and JSON translation data (hereinafter referred to as 'the Data') distributed by this site may be freely processed, published, and redistributed.",
        citation: "You are not required to display the site name or URL as the source of the Data (though you are welcome to do so).",
        revocation: {
          intro: "The permission to use the Data will be revoked in the following cases. If the revocation of permission results in the loss of your right to publish or redistribute the Data or derivative works, you must promptly cease publication and redistribution:",
          rights: "If publishing or redistributing the Data infringes on the rights of HoYoverse operating companies (COGNOSPHERE PTE. LTD., miHoYo Co., Ltd., and other national branches or subsidiaries) or other third parties",
          terms: "If publishing or redistributing the Data violates the terms of service of Genshin Impact or related services (such as HoYoLab)",
          laws: "If publishing or redistributing the Data violates Japanese law or the laws of your country of residence",
          request: "If requested by the site operator to cease use of the Data"
        },
        disclaimer: "The site operator assumes no responsibility for any damages incurred by you or third parties in connection with the use, processing, publication, or redistribution of the Data."
    },
    contactText: "If you have any questions, please contact us via {twitterLink}. (You can send DMs even if you don't follow us.)"
} as const;