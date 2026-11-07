import { deLocalizeUrl } from "#lib/paraglide/runtime.js";
import type { Reroute } from "@sveltejs/kit/hooks";

export const reroute: Reroute = (request) =>
  deLocalizeUrl(request.url).pathname;
