import { FC, useContext } from "react";
import { LocaleContext } from "@/contexts/LocaleContext";
import type { ReactNode } from "react";
import type { Locale } from "@/types";

type Props = {
  children: ReactNode
  lang: Locale
};

export const Sentence: FC<Props> = ({ children, lang }): JSX.Element => {
  const currentLocale = useContext(LocaleContext);

  return (
    <>
      { lang === currentLocale ? children : "" }
    </>
  );
};
