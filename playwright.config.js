const { devices } = require("@playwright/test");

module.exports = {
  testMatch: /.*(pwtest)\.(js|ts|mjs)/,
  workers: 1, // disable concurrent tests

  projects: [
    {
      name: "Chromium - Desktop",
      use: {
        ...devices["Desktop Chrome"],
        // ▼▼ Debug Options ▼▼
        // headless: false,
        // launchOptions: {
        //   slowMo: 50,
        // },
      },
    },
    {
      name: "Chrome - Mobile",
      use: devices["Pixel 5"],
    },
    {
      name: "Safari - Desktop",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "Safari - Mobile",
      use: {
        ...devices["iPhone 12"],
        isMobile: false, // Workaround: without this, "search by tag" test fails
      },
    },
    {
      name: "Firefox - Desktop",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "Firefox - Mobile",
      use: {
        ...devices["Pixel 5"],
        defaultBrowserType: "firefox",
        userAgent: "Mozilla/5.0 (Android 12; Mobile; rv:102.0) Gecko/102.0 Firefox/102.0",
        isMobile: false, // Workaround: without this, "search by tag" test fails
      },
    },
  ],
};
