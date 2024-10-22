export default {
    notTranslated: "此页面尚未完全翻译成英文/简体中文。",
  introText: "本站的翻译数据以CSV格式（适用于普通用户）和JSON格式（适用于开发者）提供。您可以自由处理、发布和重新分发数据。（详情请参阅使用说明部分）",
  
  csvTitle: "CSV（适用于普通用户）",
  csvDownloadUtf8: "下载CSV（UTF-8版本）",
  csvDownloadShiftJis: "下载CSV（Shift_JIS版本）",
  csvNote: "使用Excel打开CSV文件时，建议使用Shift_JIS版本。UTF-8版本可能会出现字符编码问题。\n对于其他软件，如果遇到字符编码问题，请尝试UTF-8和Shift_JIS两个版本。",

  jsonTitle: "JSON（适用于开发者）",
  jsonUrlTitle: "数据URL",
  jsonUrlText: "可以从{url}获取数据",
  jsonFormatTitle: "数据格式",
  jsonFormatText: "JSON数据由对象数组组成，如下例所示：",

  propertyTitle: "每个对象具有以下属性：",
  propertyId: "每个词条的唯一ID。您可以通过访问https://genshin-dictionary.com/[ ID ]/来查看该词条的页面。请注意，此ID可能会在没有通知的情况下更改。",
  propertyEn: "英文名称",
  propertyJa: "日文名称",
  propertyZhCN: "中文名称",
  propertyPronunciationJa: "日语读音（平假名、片假名和符号）",
  propertyNotes: "注释（面向日语使用者）。可能包含HTML。",
  propertyNotesZh: "注释（面向中文使用者）。可能包含HTML。",
  propertyVariants: "常见错误写法和别称。例如，钟离的错误写法'鐘離'，或'染血的骑士道'的简称'血染'等。",
  propertyVariantsEn: "英文错误写法和别称",
  propertyVariantsJa: "日文错误写法和别称",
  propertyExamples: "示例句子",
  propertyExamplesEn: "英文示例句子",
  propertyExamplesJa: "日文示例句子",
  propertyExamplesRef: "示例来源",
  propertyExamplesRefURL: "来源链接",
  propertyCreatedAt: "创建日期（yyyy-mm-dd格式）",
  propertyUpdatedAt: "最后更新日期（yyyy-mm-dd格式）",
  propertyTags: "标签。存在以下标签：",

  compatibilityTitle: "兼容性",
  compatibilityText: "此数据目前处于测试版阶段。请注意，可能会在没有通知的情况下进行破坏性更改。",

  usageNotesTitle: "使用说明",
  lastUpdated: "最后更新：2022年1月3日",
  usageNotes: {
    basic: `本站提供的CSV和JSON翻译数据（以下简称"数据"）可以自由处理、发布和重新分发。`,
    citation: "您不需要标注本站的网站名称或URL作为数据来源（当然这样做也没问题）。",
    revocation: {
      intro: "在以下情况下，使用数据的许可将被撤销。如果许可撤销导致您失去发布或重新分发数据或衍生作品的权利，您必须立即停止发布和重新分发：",
      rights: "如果发布或重新分发数据侵犯了米哈游运营公司（COGNOSPHERE PTE. LTD.，上海米哈游网络科技股份有限公司、miHoYo株式会社及其他国家分公司/子公司）或其他第三方的权利",
      terms: "如果发布或重新分发数据违反了原神或相关服务（如HoYoLab）的服务条款",
      laws: "如果发布或重新分发数据违反了日本法律或您所在国家的法律",
      request: "如果网站运营者要求停止使用数据"
    },
    disclaimer: "对于您或第三方因使用、处理、发布或重新分发数据而遭受的任何损失，本站运营者概不负责。"
  },
  contactText: "如有任何疑问，请通过{twitterLink}联系我们。（即使您没有关注我们，也可以发送私信。）"
}