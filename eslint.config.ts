import { withNuxt } from "./.nuxt/eslint.config.mjs";

const configs = withNuxt([
  {
    ignores: [
      "./.nuxt/**",
      "./dist/**",
      "./dataset/**",
    ],
  },

  {
    files: [ "**/*.ts", "**/*.js", "**/*.mjs", "**/*.cjs", "**/*.vue" ],
    rules: {
      "@stylistic/array-bracket-spacing": [ "error", "always", {
        objectsInArrays: false,
        arraysInArrays: false,
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
      "@stylistic/template-curly-spacing": [ "error", "always" ],

      //
      // Off
      //
      "@stylistic/multiline-ternary": "off",
    },
  },

  {
    files: [ "**/*.vue" ],
    rules: {
      "vue/array-bracket-spacing": [ "error", "always", {
        objectsInArrays: false,
        arraysInArrays: false,
      }],
      "vue/html-self-closing": [ "error", {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
      }],
      "vue/max-attributes-per-line": [ "error", {
        singleline: 7,
        multiline: { max: 2 },
      }],
      "vue/quote-props": [ "error", "as-needed" ],

      //
      // Off
      //
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
]);

export default configs;
