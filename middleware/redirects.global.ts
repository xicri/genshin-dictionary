import wordRedirects from "../dataset/redirect/words.json";
import tagRedirects from "../dataset/redirect/tags.json";
import type { TagID } from "../types";

type ObsoleteWordID = keyof typeof wordRedirects;
type ObsoleteTagID = keyof typeof tagRedirects;

const getWordRedirectDestination = (srcWordID: ObsoleteWordID): string => wordRedirects[srcWordID];
const getTagRedirectDestination = (srcWordID: ObsoleteTagID): TagID => tagRedirects[srcWordID] as TagID;

export default defineNuxtRouteMiddleware((to) => {
  const [ locale, ...rest ] = to.path.split("/").filter(component => !!component);

  if (rest.length === 2 && rest[0] === "tags") { // tag page
    const srcTagID = rest[1] as ObsoleteTagID;
    const destTagID: TagID = getTagRedirectDestination(srcTagID);

    if (destTagID) {
      return navigateTo(`/${locale}/tags/${destTagID}`, { redirectCode: 301 });
    }
  } else if (rest.length === 1) { // word page
    const srcWordID = rest[0] as ObsoleteWordID;
    const destWordID = getWordRedirectDestination(srcWordID);

    if (destWordID) {
      return navigateTo(`/${locale}/${destWordID}`, { redirectCode: 301 });
    }
  }
});
