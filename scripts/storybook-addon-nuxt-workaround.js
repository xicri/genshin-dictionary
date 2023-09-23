/* Brought from https://github.com/hirotaka/storybook-addon-nuxt/issues/24#issuecomment-1683340670 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const packageJsonPath = join(__dirname, "../node_modules/storybook-addon-nuxt/package.json");

try {
  const packageJsonContent = await readFile(
    packageJsonPath,
    "utf-8",
  );
  const packageJson = JSON.parse(packageJsonContent);

  if (!packageJson.type) {
    packageJson.type = "module";
    await writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
    );
    console.log("Workaround applied to package.json for storybook-addon-nuxt");
  } else {
    console.log("package.json already contains the 'type' property.");
  }
} catch (err) {
  console.error("Error fixing package.json:", err.message);
  process.exit(1);
}

