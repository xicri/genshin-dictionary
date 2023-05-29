import { getAvailableLocales } from "@/libs/i18n";
import type { Locale } from "@/types";

type AlternateProps = {
  canonical: string;
  languages: {
    [key in Locale]?: string;
  },
};

export function generateAlternates(canonicalPath: string, locale: Locale): AlternateProps {
  return {
    canonical: `https://genshin-dictionary.com/${locale}${canonicalPath}`,
    languages: getAvailableLocales().reduce((obj, loc) => ({ ...obj, [loc]: `/${loc}${canonicalPath}` }), {}),
  };
}
