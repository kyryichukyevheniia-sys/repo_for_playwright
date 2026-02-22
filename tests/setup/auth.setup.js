const { test: setup } = require("@playwright/test");

setup("authenticate", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Sign In" }).click();

  await page.getByLabel("Email").fill(process.env.USER_EMAIL);
  await page.getByLabel("Password").fill(process.env.USER_PASSWORD);

  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("/panel/garage");

  await page.context().storageState({ path: "storageState.json" });
});
