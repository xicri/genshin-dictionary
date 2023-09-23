import ClosingLayer from "../components/closing-layer.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof ClosingLayer> = {
  title: "word-list",
  component: ClosingLayer,
  tags: [ "autodocs" ],
};
export default meta;

export const Primary: StoryObj<typeof ClosingLayer> = {
  args: {
    enabled: true,
  },
};
