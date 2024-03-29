"use strict";

module.exports = {
  root: true,
  extends: "xicri/nuxt+ts",

  parserOptions: {
    project: "./tsconfig.json",
  },

  rules: {
    "no-unused-vars": "off",
  },

  overrides: [
    {
      files: [ "*.test.ts", "*.pwtest.ts" ],
      rules: {
        // non-null assertions (`var!.prop`) is required in test to raise error when the var is null or undefined.
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
};
