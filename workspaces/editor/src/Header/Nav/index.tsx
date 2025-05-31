"use client";

import React from "react";

import Link from "next/link";
import { SearchIcon } from "lucide-react";
import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";

export const HeaderNav: React.FC<{ data: HeaderType; }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />;
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  );
};
