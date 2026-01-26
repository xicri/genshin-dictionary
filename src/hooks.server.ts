import { paraglideMiddleware } from "$lib/paraglide/server";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({ event, resolve }) => {
  event.setHeaders({
    "Cross-Origin-Resource-Policy": "same-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
    "X-Content-Type-Options": "nosniff",
  });

  return paraglideMiddleware(event.request, async ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;

    console.log("りだいれくと", localizedRequest.redirect, "←", event.url.href);

    const res = await resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%lang%", locale),
    });

    if (res.status === 200) {
      event.setHeaders({
        // max-age: 4 hours, s-maxage: 1 year
        "Cache-Control": "max-age=14400, s-maxage=31536000, public", // TODO 307までキャッシュされてる
      });
    }

    return res;
  });
};
