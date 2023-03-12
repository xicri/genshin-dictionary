export type Locale = "en" | "ja" | "zh-CN";

export type tFunction = (key: string, variables?: { [varName: string]: string|number }) => string;

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

export type History = {
  [key: string]: BuiltWord[];
};
