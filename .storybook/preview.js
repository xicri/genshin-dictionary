import { setup } from "@storybook/vue3";
import { createI18n } from "vue-i18n";
import i18nConfig from "../i18n.config.js";

const i18n = createI18n(i18nConfig);
setup((app) => {
  //if (!app.__VUE_I18N__) {
    app.use(i18n);
  //}
});

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
