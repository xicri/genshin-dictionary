import type allTags from "./dataset/tags.json";

export type Locale = "en" | "ja" | "zh-CN";

export type TagID = keyof typeof allTags;

export type Word = {
  id: string;
  en: string;
  ja: string;
  pronunciationJa?: string;
  zhCN?: string;
  pinyins?: {
    char: string;
    pron: string;
  }[];
  notes?: string;
  notesZh?: string;
  tags?: TagID[];
  examples?: {
    en: string;
    ja: string;
    zhCN: string;
    ref: string;
    refURL: string;
  }[];
  variants?: {
    en: string[];
    ja: string[];
    zhCN: string[];
  };
  updatedAt: string;
  createdAt: string;
  _meta?: {
    translator: {
      enToJa: boolean;
      jaToEn: boolean;
    };
  };
};
