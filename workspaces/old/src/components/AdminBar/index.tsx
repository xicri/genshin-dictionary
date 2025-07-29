"use client";

import type { PayloadAdminBarProps, PayloadMeUser } from "@payloadcms/admin-bar";

import { useSelectedLayoutSegments } from "next/navigation";
import { PayloadAdminBar } from "@payloadcms/admin-bar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utilities/ui";

import "./index.scss";

import { getClientSideURL } from "@/utilities/getURL";

const baseClass = "admin-bar";

const collectionLabels = {
  words: {
    plural: "Words",
    singular: "Word",
  },
  tags: {
    plural: "Tags",
    singular: "Tag",
  },
  projects: {
    plural: "Projects",
    singular: "Project",
  },
};

const Title: React.FC = () => <span>Dashboard</span>;

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
}> = (props) => {
  const { adminBarProps } = props || {};
  const segments = useSelectedLayoutSegments();
  const [ show, setShow ] = useState(false);
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : "words"
  ) as keyof typeof collectionLabels;
  const router = useRouter();

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id));
  }, []);

  return (
    <div
      className={cn(baseClass, "py-2 bg-black text-white", {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || "Pages",
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch("/next/exit-preview").then(() => {
              router.push("/");
              router.refresh();
            });
          }}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </div>
    </div>
  );
};
