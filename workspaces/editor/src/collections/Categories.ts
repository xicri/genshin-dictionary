import { slugField } from "@/fields/slug/index.ts";
import { anyone } from "../access/anyone.ts";
import { member } from "../access/member.ts";
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    create: member,
    delete: member,
    read: anyone,
    update: member,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    ...slugField(),
  ],
};
