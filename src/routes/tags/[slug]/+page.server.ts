import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  if (params.slug) {
    return {
      slug: params.slug,
    };
  } else {
    error(404, "Not found");
  }
};
