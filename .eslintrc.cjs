module.exports = {
  root: true,
  extends: "xicri/vue+js",

  globals: {
    computed: "readonly",
    createError: "readonly",
    defineEventHandler: "readonly",
    defineNuxtConfig: "readonly",
    defineNuxtRouteMiddleware: "readonly",
    navigateTo: "readonly",
    nextTick: "readonly",
    onMounted: "readonly",
    onUpdated: "readonly",
    useContext: "readonly",
    useHead: "readonly",
    useLazyAsyncData: "readonly",
    useNuxtApp: "readonly",
    useRoute: "readonly",
    useRuntimeConfig: "readonly",
    ref: "readonly",

    // nuxt/i18n
    useI18n: "readonly",
    useLocaleHead: "readonly",
    useLocalePath: "readonly",
    useSwitchLocalePath: "readonly",
  },

  rules: {
    "vue/html-self-closing": [ "error", {
      html: {
        void: "always",
        normal: "always",
        component: "always",
      },
    }],
    "no-unused-vars": "off",
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
