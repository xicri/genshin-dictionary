import { FC } from "react";
import { LocaleContext } from "@/contexts/LocaleContext";
import type { ReactNode } from "react";
import type { Locale } from "@/types";

type Props = {
  children: ReactNode
  locale: Locale
};

export const Article: FC<Props> = ({ children, locale: currentLocale }): JSX.Element => (
  <LocaleContext.Provider value={currentLocale}>
    { children }
  </LocaleContext.Provider>
);

