import { defineParaglideStrategies } from "$lib/server/paraglide.ts";
import { getTextDirection } from "$lib/paraglide/runtime.js";
import { paraglideMiddleware } from "$lib/paraglide/server.js";
import { headers } from "./app.config.ts";
import type { Handle } from "@sveltejs/kit/hooks";

export const handle: Handle = ({ event, resolve }) => {
  event.setHeaders({
    ...headers,

    // max-age: 4 hours, s-maxage: 1 year
    "Cache-Control": "max-age=14400, s-maxage=31536000, public",
  });

  defineParaglideStrategies();

  return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    return resolve(
      {
        ...event,
        request: localizedRequest,
      },
      {
        transformPageChunk: ({ html }) => html
          .replace("%lang%", locale)
          .replace("%dir%", getTextDirection(locale)),
      },
    );
  });
};
