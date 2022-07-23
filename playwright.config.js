const { devices } = require("@playwright/test");

module.exports = {
  testMatch: /.*(pwtest)\.(js|ts|mjs)/,
  workers: 1, // disable concurrent tests

  projects: [
    {
      name: "Chromium - Desktop",
      use: {
        browserName: "chromium",
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
        browserName: "webkit",
        viewport: { width: 1200, height: 750 },
      },
    },
    {
      name: "Safari - Mobile",
      use: devices["iPhone 12"],
    },
    {
      name: "Firefox - Desktop",
      use: {
        browserName: "firefox",
      },
    },
    {
      name: "Firefox - Mobile",
      use: {
        browserName: "firefox",
        viewport: { width: 800, height: 600 },
      },
    },
  ],
};
