import type { Metadata as OriginalMetadata } from "next";
import type tags from "../public/dataset/tags.json";

export type Locale = "en" | "ja" | "zh-CN";

export type Translations = {
  en: {
    [key: string]: string,
  };
  ja: {
    [key: string]: string,
  };
  "zh-CN": {
    [key: string]: string,
  };
};

export type TagID = keyof typeof tags;

export type BuiltWord = {
  id: string;
  en: string;
  ja?: string;
  zhCN?: string;
  pronunciationJa?: string;
  pinyins?: {
    char: string,
    pron: string
  }[],
  tags?: TagID[];
  notes?: string;
  notesZh?: string;
  variants?: {
    en?: string[];
    ja?: string[];
    zhCN?: string[];
  },
  examples?: {
    en: string;
    ja: string;
    // zhCN?: string;
    ref?: string;
    refURL?: string;
  }[];
  createdAt: string;
  updatedAt?: string;
  _meta?: {
    translator?: boolean | {
      enToJa: boolean;
      jaToEn: boolean;
    };
  };
};

export type Tags = {
  [key: string]: {
    en: string;
    ja: string;
    "zh-CN": string;
    title: {
      en: string;
      ja: string;
      "zh-CN": string;
    };
  };
};

export type History = {
  [key: string]: BuiltWord[];
};

export type SearchConditions = {
  wordID?: string,
  query?: string,
  activeTags?: TagID[],
  maxWords?: number,
  sortBy?: "createdAt",
};

export type OnSearchProps = {
  query?: string,
  newTag?: TagID,
  removeTagIndex?: number,
  maxWords?: number | "reset",
};

/** Make specified properties required */
type Require<Super, Keys extends keyof Exclude<Super, null|undefined>> = Super & {
  [Property in Keys]-?: Exclude<Super, null|undefined>[Property];
};

export type Metadata = Require<OriginalMetadata, "title"|"description"> & {
  alternates: Require<OriginalMetadata["alternates"], "canonical"|"languages">;
  openGraph: Require<OriginalMetadata["openGraph"], "title"|"description"|"url">;
};
