import { defineConfig, devices } from "@playwright/test";

const debugOptions = {
  // headless: false,
  // launchOptions: {
  //   slowMo: 50,
  // },
};

const config = defineConfig({
  testMatch: /.*(pwtest)\.ts/,
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
    {
      name: "Firefox - Desktop",
      use: {
        ...devices["Desktop Firefox"],
        ...debugOptions,
      },
    },
  ],

  webServer: {
    command: "PORT=5678 npm start",
    url: "http://localhost:5678/ja/",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:5678/ja/",
  },
});

export default config;
