import wordRedirects from "../../public/dataset/redirect/words.json";
import tagRedirects from "../../public/dataset/redirect/tags.json";

export const getWordRedirectDestination = (srcWordID) => wordRedirects[srcWordID];
export const getTagRedirectDestination = (srcWordID) => tagRedirects[srcWordID];
