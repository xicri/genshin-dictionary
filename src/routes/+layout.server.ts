import { SERVER_ENV } from "$env/static/private";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => {
  return {
    allowIndex: SERVER_ENV === "production",
  };
};
