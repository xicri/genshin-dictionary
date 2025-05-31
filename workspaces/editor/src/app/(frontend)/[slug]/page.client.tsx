"use client";

import { Fragment, useEffect, type FC } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";

const PageClient: FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("light");
  }, [ setHeaderTheme ]);
  return <Fragment />;
};

export default PageClient;
