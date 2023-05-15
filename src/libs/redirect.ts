import wordRedirects from "../../public/dataset/redirect/words.json";
import tagRedirects from "../../public/dataset/redirect/tags.json";

type RedirectObject = {
  [key: string]: string,
};

export const getWordRedirectDestination = (srcWordID: string): string|undefined => (wordRedirects as RedirectObject)[srcWordID];
export const getTagRedirectDestination = (srcWordID: string): string|undefined => (tagRedirects as RedirectObject)[srcWordID];
