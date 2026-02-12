import { defineParaglideStrategies } from "$lib/server/paraglide";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { headers } from "./app.config.ts";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({ event, resolve }) => {
  event.setHeaders({
    ...headers,

    // max-age: 4 hours, s-maxage: 1 year
    "Cache-Control": "max-age=14400, s-maxage=31536000, public",
  });

  defineParaglideStrategies();

  return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%lang%", locale),
    });
  });
};
