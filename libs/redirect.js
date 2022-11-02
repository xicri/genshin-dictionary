import wordRedirects from "../dataset/redirect/words.json";
import tagRedirects from "../dataset/redirect/tags.json";

export const getWordRedirectDestination = (srcWordID) => wordRedirects[srcWordID];
export const getTagRedirectDestination = (srcWordID) => tagRedirects[srcWordID];
