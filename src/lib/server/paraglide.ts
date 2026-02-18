import { getRedirectedLocale } from "$lib/i18n/setup.ts";
import {
  defineCustomServerStrategy,
  extractLocaleFromRequest,
} from "$lib/paraglide/runtime.js";

export const defineParaglideStrategies = () =>
  defineCustomServerStrategy("custom-locale-alias", {
    getLocale: (req) => {
      if (!req) {
        return undefined;
      }

      const reqLocale = extractLocaleFromRequest(req);
      return getRedirectedLocale(reqLocale);
    },
  });
