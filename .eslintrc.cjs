"use strict";

module.exports = {
  root: true,
  extends: "xicri/next",

  parserOptions: {
    project: "./tsconfig.json",
  },
  overrides: [
    {
      files: [ "**/*.js" ],
      parserOptions: {
        sourceType: "module",
      },
    },
    {
      files: [ "**/*.test.js", "**/*.test.mjs" ],
      extends: "xicri/jest",
      rules: {
        "jest/expect-expect": [ "error", {
          assertFunctionNames: [ "expect", "ok" ],
        }],
        "jest/no-conditional-expect": "off",
      },
    },
  ],

  rules: {
    "@next/next/no-img-element": "off",
  },
};
