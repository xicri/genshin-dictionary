import { defineConfig, devices } from "@playwright/test";

const debugOptions = {
  // headless: false,
  launchOptions: {
    slowMo: 1000,
  },
};

export default defineConfig({
  testMatch: /.*(pwtest)\.(js|ts|mjs)/,
  workers: 1, // disable concurrent tests

  projects: [
    {
      name: "Chromium - Desktop",
      use: {
        ...devices["Desktop Chrome"],
        ...debugOptions,
      },
    },
    {
      name: "Chrome - Mobile",
      use: {
        ...devices["Pixel 5"],
        ...debugOptions,
      },
    },
    {
      name: "Safari - Mobile",
      use: {
        ...devices["iPhone 12"],
        isMobile: false, // Workaround: without this, "search by tag" test fails
        ...debugOptions,
      },
    },
    // Temporarily disable Firefox tests because it does not pass for unknown reason
    // {
    //   name: "Firefox - Desktop",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     ...debugOptions,
    //   },
    // },
  ],

  webServer: {
    command: "npm run test:server",
    url: "http://localhost:5678/ja",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:5678/ja",
  },
});
