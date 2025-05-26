import { core, nodejs, vue, nuxt } from "@xicri/configs/eslint";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [
  {
    ignores: [
      "./.nuxt/**",
      "./dist/**",
    ],
  },

  ...core,
  ...nodejs,
  ...vue,
  ...nuxt,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default configs;
