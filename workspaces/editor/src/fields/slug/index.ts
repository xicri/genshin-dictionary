import type { CheckboxField, TextField } from "payload";

type Slug = (fieldToUse: string) => [TextField, CheckboxField];

export const slugField: Slug = (fieldToUse) => {
  const checkBoxField: CheckboxField = {
    name: "slugLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar",
    },
  };

  const slugField: TextField = {
    name: "slug",
    type: "text",
    index: true,
    label: "Slug",
    hooks: {
      beforeValidate: [
        ({ data, operation, value }) => {
          const val = value as unknown;

          if (typeof val === "string") {
            return formatSlug(val);
          }

          if (operation === "create" || !data?.slug) {
            if (typeof data?.[fieldToUse] === "string") {
              return formatSlug(data?.[fieldToUse]);
            }
          }

          return val;
        },
      ],
    },
    admin: {
      position: "sidebar",
      components: {
        Field: {
          path: "@/fields/slug/SlugComponent#SlugComponent",
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  };

  return [ slugField, checkBoxField ];
};
