import { slugField } from "@/fields/slug/index.ts";
import { anyone } from "../access/anyone.ts";
import { member } from "../access/member.ts";
import type { CollectionConfig } from "payload";

export const Words: CollectionConfig = {
  slug: "words",
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
      name: "kana",
      label: "Japanese pronunciation (ふりがな)",
      type: "text",
      required: false,
    },
    {
      name: "isKanaOfficial",
      label: "Kana has official source?",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },
    {
      name: "zh-CN",
      label: "Simplified Chinese",
      type: "text",
      required: false,
    },
    {
      name: "pinyins",
      label: "Pinyins (拼音)",
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
      name: "zh-TW",
      label: "Traditional Chinese",
      type: "text",
      required: false,
    },
    {
      name: "zhuyins",
      label: "Zhuyins (注音)",
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
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      required: false,
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
          required: true,
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
      name: "examples",
      type: "group",
      required: false,
      fields: [
        {
          name: "en",
          type: "text",
          required: false,
        },
        {
          name: "ja",
          type: "text",
          required: false,
        },
        {
          name: "zh-CN",
          type: "text",
          required: false,
        },
        {
          name: "zh-TW",
          type: "text",
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
      name: "variants",
      type: "group",
      required: false,
      fields: [
        {
          name: "en",
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
          name: "ja",
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
          name: "zh-CN",
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
          name: "zh-TW",
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
      ],
    },
    // TODO
    // /** The date this word is added */
    // createdAt?: string;
    // /** The date this word is updated */
    // updatedAt?: string;

    ...slugField("en"),
  ],
};
