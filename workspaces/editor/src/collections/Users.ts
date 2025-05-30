import { authenticated } from "../access/authenticated.ts";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  auth: true,
  slug: "users",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: [ "name", "email" ],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
  timestamps: true,
};
