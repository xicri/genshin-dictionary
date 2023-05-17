/* This layout is not used. src/app/[locale]/layout.tsx is essentially the root layout */

import type { ReactNode } from "react";
import type { Locale } from "@/types";

type Props = {
  children: ReactNode,
  locale: Locale,
};

export default function Layout({ children, locale }: Props): JSX.Element {
  return (
    <html lang={locale}>
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
