import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  SERVER_ENV: { static: true },
});
