import { defineConfig } from "tsup";

export default defineConfig({
  entry: [ "cloudflare/functions/locale-redirect.ts" ],

  outDir: "functions",
  target: "chrome128",
  format: "esm",

  dts: false,
  sourcemap: true,

  treeshake: true,
  minify: true,
  splitting: false,
  clean: true,

  // Any npm packages should be bundled for Cloudflare Pages Functions
  noExternal: [ /.+/ ],
});
