import WordListResults from "../components/word-list-results.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof WordListResults> = {
  title: "WordListResults",
  component: WordListResults,
  tags: [ "autodocs" ],
};
export default meta;

export const Primary: StoryObj<typeof WordListResults> = {
  args: {
    words: [
      {
        id: "lumine",
        en: "Lumine",
        ja: "蛍",
        zhCN: "荧",
        pronunciationJa: "ほたる",
        notes: "女性主人公名。発音は「ルミーン」と思われるが諸説あり。俗称として MC (Main Character の略?) と呼ばれることもある。",
        notesZh: "女主人公的名字",
        tags: [ "character-main" ],
        createdAt: "2022-01-01",
        updatedAt: "2023-04-23",
      },
      {
        id: "callas-line",
        en: "Callas Line",
        ja: "カーレス線",
        zhCN: "卡雷斯线",
        tags: [ "fontaine", "facility" ],
        notes: "フォンテーヌの巡水船の線の1つ",
        createdAt: "2023-08-19",
        updatedAt: "2023-08-24",
      },
    ],
  },
};
