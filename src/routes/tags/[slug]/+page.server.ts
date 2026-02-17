import { error } from "@sveltejs/kit";
import { m } from "$lib/paraglide/messages.js";
import tags from "$lib/dataset/tags.json";
import { getSupportedLocale } from "$lib/i18n/runtime.ts";
import { isTagSlug } from "$lib/types.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  if (!isTagSlug(params.slug)) { // unexpected slug given
    error(404, "Not found");
  }

  const locale = getSupportedLocale();
  const title = `${ tags[params.slug].title[locale] } | ${ m.siteTitle() }`;

  return {
    title,
    slug: params.slug,
  };
};
