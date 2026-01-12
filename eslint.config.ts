import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsonc from "eslint-plugin-jsonc";
import svelte from "eslint-plugin-svelte";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  globalIgnores([
    "./project.inlang/.*.json",
  ]),

  js.configs.recommended,
  ...ts.configs.recommended,
  stylistic.configs.recommended,
  ...svelte.configs.recommended,
  ...jsonc.configs["flat/recommended-with-json"],
  ...jsonc.configs["flat/recommended-with-jsonc"],
  ...jsonc.configs["flat/recommended-with-json5"],

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",
    },
  },

  {
    files: [
      "**/*.ts",
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs",
      "**/*.vue",
      "**/*.svelte",
      "**/*.svelte.ts",
      "**/*.svelte.js",
    ],
    rules: {
      "@stylistic/array-bracket-spacing": [ "error", "always", {
        objectsInArrays: false,
        arraysInArrays: false,
      }],
      "@stylistic/arrow-parens": [ "error", "always" ],
      "@stylistic/brace-style": [ "error", "1tbs" ],
      "@stylistic/indent": [ "error", 2, {
        flatTernaryExpressions: true,
      }],
      "@stylistic/member-delimiter-style": [ "error", {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
      }],
      "@stylistic/object-curly-spacing": [ "error", "always", {
        arraysInObjects: false,
        objectsInObjects: false,
      }],
      "@stylistic/quote-props": [ "error", "as-needed" ],
      "@stylistic/quotes": [ "error", "double" ],
      "@stylistic/semi": [ "error", "always" ],
      "@stylistic/template-curly-spacing": [ "error", "always" ],

      //
      // Off
      //
      "@stylistic/multiline-ternary": "off",
    },
    plugins: {
      "@stylistic": stylistic,
    },
  },

  {
    files: [
      "**/*.svelte",
      "**/*.svelte.ts",
      "**/*.svelte.js",
    ],

    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [ ".svelte" ],
        parser: ts.parser,
        svelteConfig,
      },
    },

    rules: {
      "svelte/indent": [ "error", {
        indent: 2,
        switchCase: 1,
      }],
      "@stylistic/indent": "off",

      "svelte/no-navigation-without-resolve": "off",
    },
  },

  {
    files: [
      "**/*.json",
      "**/*.jsonc",
      "**/*.json5",
    ],
    rules: {
      "jsonc/indent": [ "error", 2 ],
    },
  },
  {
    files: [
      "**/*.jsonc",
      "**/*.json5",
      "**/tsconfig.json",
      "./.vscode/*.json",
    ],
    rules: {
      "jsonc/no-comments": "off",
    },
  },
);
