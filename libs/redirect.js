import wordRedirects from "../static/dataset/redirect/words.json";
import tagRedirects from "../static/dataset/redirect/tags.json";

export const getWordRedirectDestination = (srcWordID) => wordRedirects[srcWordID];
export const getTagRedirectDestination = (srcWordID) => tagRedirects[srcWordID];
