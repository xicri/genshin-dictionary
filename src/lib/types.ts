import type allTags from "$lib/dataset/tags.json";

export type TagID = keyof typeof allTags;

export type Word = {
  id: string;
  en: string;
  ja: string;
  pronunciationJa?: string;
  zhCN?: string;
  zhTW?: string;
  pinyins?: {
    char: string;
    pron: string;
  }[];
  notes?: string;
  notesEn?: string;
  notesZh?: string;
  notesZhTW?: string;
  tags?: TagID[];
  examples?: {
    en: string;
    ja: string;
    zhCN: string;
    zhTW: string;
    ref: string;
    refURL: string;
  }[];
  variants?: {
    en: string[];
    ja: string[];
    zhCN: string[];
    zhTW: string[];
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
