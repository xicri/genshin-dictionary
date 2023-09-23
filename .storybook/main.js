import { resolve } from "path";
import { mergeConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

console.log("loc", resolve(__dirname, ".."))

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-nuxt",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  features: {
    storyStoresV7: true,
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => mergeConfig(config, {
    resolve: {
      alias: {
        '@': resolve(__dirname, ".."),
        '~': resolve(__dirname, ".."),
      },
    },
    plugins: [
      AutoImport({
        imports: [ 'vue', 'vue-router' ],
        dirs: [ '../composables', "./stores" ],
        vueTemplate: true
      }),
      Components({
        dirs: [ '../components/', "./composables" ],
        dts: true,
        directoryAsNamespace: true
      })
    ],
  }),
};
export default config;
