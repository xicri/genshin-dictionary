import { error } from "@sveltejs/kit";
import { m } from "$lib/paraglide/messages.js";
import { getLocale } from "$lib/paraglide/runtime.js";
import tags from "$lib/dataset/tags.json";
import type { TagID } from "$lib/types.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  if (params.slug) {
    const getTagIdFromParams = (): TagID => {
      const tagID = params.slug;

      if (!Object.keys(tags).includes(tagID)) { // unexpected tagID given
        error(404, "Not found");
      }

      return tagID as TagID;
    };

    const locale = getLocale();
    const tagSlug = getTagIdFromParams();
    const title = `${ tags[tagSlug].title[locale] } | ${ m.siteTitle() }`;

    return {
      title,
      slug: params.slug,
    };
  } else {
    error(404, "Not found");
  }
};
