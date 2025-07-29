import { slugField } from "@/fields/slug/index.ts";
import { anyone } from "../access/anyone.ts";
import { member } from "../access/member.ts";
import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  access: {
    create: member,
    delete: member,
    read: anyone,
    update: member,
  },
  admin: {
    useAsTitle: "en",
  },
  fields: [
    {
      name: "en",
      label: "Label (English)",
      type: "text",
      required: true,
    },
    {
      name: "ja",
      label: "Label (Japanese)",
      type: "text",
      required: true,
    },
    {
      name: "zh-CN",
      label: "Label (Simplified Chinese)",
      type: "text",
      required: true,
    },
    {
      name: "zh-TW",
      label: "Label (Traditional Chinese)",
      type: "text",
      required: true,
    },
    ...slugField("en"),
  ],
};
