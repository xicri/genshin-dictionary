"use strict";

module.exports = {
  root: true,
  extends: "xicri/nuxt+ts",

  },

  rules: {
    "no-unused-vars": "off",
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
