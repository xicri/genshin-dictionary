import { core, nodejs, vue } from "@xicri/configs/eslint";
import { withNuxt } from "./.nuxt/eslint.config.mjs";

const configs = withNuxt([
  {
    ignores: [
      "./.nuxt/**",
      "./dist/**",
      "./dataset/**",
    ],
  },

  ...core,
  ...nodejs,
  ...vue,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);

export default configs;
