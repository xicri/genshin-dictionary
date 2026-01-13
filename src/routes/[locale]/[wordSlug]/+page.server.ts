import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  if (params.wordSlug) {
    return {
      slug: params.wordSlug,
    };
  } else {
    error(404, "Not found");
  }
};
