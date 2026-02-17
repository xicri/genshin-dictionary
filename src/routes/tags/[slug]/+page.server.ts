import { error } from "@sveltejs/kit";
import { m } from "$lib/paraglide/messages.js";
import tags from "$lib/dataset/tags.json";
import { getSupportedLocale } from "$lib/i18n/runtime.ts";
import type { TagSlug } from "$lib/types.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  if (params.slug) {
    const getTagSlugFromParams = (): TagSlug => {
      const tagSlug = params.slug;

      if (!Object.keys(tags).includes(tagSlug)) { // unexpected tagSlug given
        error(404, "Not found");
      }

      return tagSlug as TagSlug;
    };

    const locale = getSupportedLocale();
    const tagSlug = getTagSlugFromParams();
    const title = `${ tags[tagSlug].title[locale] } | ${ m.siteTitle() }`;

    return {
      title,
      slug: params.slug,
    };
  } else {
    error(404, "Not found");
  }
};
