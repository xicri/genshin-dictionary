import { FlatCompat } from "@eslint/eslintrc";
import { core, nodejs, unbundled } from "@xicri/configs/eslint";
import type { Linter } from "eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const configs: Linter.Config[] = [
  {
    ignores: [
      ".next/",
    ],
  },

  ...core,
  ...nodejs,
  ...unbundled,
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
  ).map((config) => {
    delete config.plugins?.import;

    return config;
  }),

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        // TODO Use `project: true` instead if you use `astro` ruleset.
        // project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [ "**/*.ts", "**/*.tsx" ],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^(_|ignore)",
        },
      ],
    },
  },
];

export default configs;
