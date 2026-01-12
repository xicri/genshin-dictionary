import { paraglideMiddleware } from "$lib/paraglide/server";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%lang%", locale),
    });
  });
