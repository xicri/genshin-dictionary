import { SERVER_ENV } from "$app/env/private";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => {
  return {
    allowIndex: SERVER_ENV === "production",
  };
};
