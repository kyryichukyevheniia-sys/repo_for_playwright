// @ts-check
const { defineConfig, devices } = require("@playwright/test");
require("dotenv").config();

module.exports = defineConfig({
  testDir: "./tests",

  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD,
    },
    headless: true,
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "setup",
      testMatch: /setup\/.*\.setup\.js/,
    },

    {
      name: "public",
      testMatch: /public\/.*\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "auth-chromium",
      testMatch: /auth\/.*\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "storageState.json",
      },
      dependencies: ["setup"],
    },
  ],
});
