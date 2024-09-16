import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": import.meta.dirname,
    },
  },
});
