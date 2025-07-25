import { slugField } from "@/fields/slug";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "label",
  },
  fields: [
    {
      name: "label",
      label: "Label",
      type: "text",
      required: true,
    },
    ...slugField(),
  ],
};
