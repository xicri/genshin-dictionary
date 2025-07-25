import { slugField } from "@/fields/slug";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import type { CollectionConfig } from "payload";
import { Tags } from "./Tags.ts";

export const Words: CollectionConfig = {
  slug: "words",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "en",
  },
  fields: [
    {
      name: "en",
      label: "English",
      type: "text",
      required: true,
    },
    {
      name: "ja",
      label: "Japanese",
      type: "text",
      required: false,
    },
    {
      name: "pronunciationJa",
      label: "Japanese pronunciation (ふりがな))",
      type: "text",
      required: false,
    },
    {
      name: "zh-CN",
      label: "Simplified Chinese",
      type: "text",
      required: false,
    },
    {
      name: "zh-TW",
      label: "Traditional Chinese",
      type: "text",
      required: false,
    },
    {
      name: "pinyins",
      label: "Pinyins",
      type: "group",
      required: false,
      fields: [
        {
          name: "char",
          label: "Character",
          type: "text",
          required: true,
          minLength: 1,
          maxLength: 1,
        },
        {
          name: "pron",
          label: "Pronunciation",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "note",
      label: "Note",
      type: "group",
      required: false,
      fields: [
        {
          name: "en",
          label: "Note (English)",
          type: "text",
          required: false,
        },
        {
          name: "ja",
          label: "Note (Japanese)",
          type: "text",
          required: false,
        },
        {
          name: "zh-CN",
          label: "Note (Simplified Chinese)",
          type: "text",
          required: false,
        },
        {
          name: "zh-TW",
          label: "Note (Traditional Chinese)",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      required: false,
    },
    {
      name: "examples",
      type: "group",
      interfaceName: "Meta",
      required: false,
      fields: [
        {
          name: "en",
          type: "richText",
          required: false,
        },
        {
          name: "ja",
          type: "richText",
          required: false,
        },
        {
          name: "zh-CN",
          type: "richText",
          required: false,
        },
        {
          name: "zh-TW",
          type: "richText",
          required: false,
        },
        {
          name: "ref",
          type: "text",
          required: false,
        },
        {
          name: "refURL",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "variantsEn",
      type: "array",
      required: false,
      fields: [
        {
          name: "variants",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "variantsJa",
      type: "array",
      required: false,
      fields: [
        {
          name: "variants",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "variantsZhCN",
      type: "array",
      required: false,
      fields: [
        {
          name: "variants",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "variantsZhTW",
      type: "array",
      required: false,
      fields: [
        {
          name: "variants",
          type: "text",
          required: false,
        },
      ],
    },
    // /** The date this word is added */
    // createdAt?: string;
    // /** The date this word is updated */
    // updatedAt?: string;

    ...slugField(),
  ],
};
