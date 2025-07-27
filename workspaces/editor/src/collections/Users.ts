import { owner } from "../access/owner.ts";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  auth: true,
  slug: "users",
  access: {
    admin: owner,
    create: owner,
    delete: owner,
    read: owner,
    update: owner,
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
    {
      name: "role",
      type: "select",
      options: [
        { label: "Owner", value: "owner" },
        { label: "Member", value: "member" },
      ],
      defaultValue: "member",
      required: true,
    },
  ],
  timestamps: true,
};
