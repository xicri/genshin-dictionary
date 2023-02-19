"use strict";

module.exports = {
  root: true,
  extends: "xicri/next",

  parserOptions: {
    project: "./tsconfig.json",
  },
  overrides: [
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
};
