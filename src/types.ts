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
