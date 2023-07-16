import wordRedirects from "../dataset/redirect/words.json";
import tagRedirects from "../dataset/redirect/tags.json";

const getWordRedirectDestination = (srcWordID) => wordRedirects[srcWordID];
const getTagRedirectDestination = (srcWordID) => tagRedirects[srcWordID];

export default defineNuxtRouteMiddleware((to) => {
  const [ locale, ...rest ] = to.path.split("/").filter(component => !!component);

  if (rest.length === 2 && rest[0] === "tags") { // tag page
    const srcTagID = rest[1];
    const destTagID = getTagRedirectDestination(srcTagID);

    if (destTagID) {
      return navigateTo(`/${locale}/tags/${destTagID}`, { redirectCode: 301 });
    }
  } else if (rest.length === 1) { // word page
    const srcWordID = rest[0];
    const destWordID = getWordRedirectDestination(srcWordID);

    if (destWordID) {
      return navigateTo(`/${locale}/${destWordID}`, { redirectCode: 301 });
    }
  }
});
