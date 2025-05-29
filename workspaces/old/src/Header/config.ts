import { link } from "@/fields/link";
import { revalidateHeader } from "./hooks/revalidateHeader";
import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/Header/RowLabel#RowLabel",
        },
      },
    },
  ],
  hooks: {
    afterChange: [ revalidateHeader ],
  },
};
