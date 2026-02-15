import { deLocalizeUrl } from "$lib/paraglide/runtime";
import type { Reroute } from "@sveltejs/kit";

export const reroute: Reroute = (request) =>
  deLocalizeUrl(request.url).pathname;
