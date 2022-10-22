module.exports = {
  root: true,
  extends: [
    "xicri/nuxt+js",
  ],

  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
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
