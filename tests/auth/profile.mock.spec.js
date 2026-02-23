const { test, expect } = require("@playwright/test");

test("Mock profile response and verify UI", async ({ page }) => {
  await page.route("**/api/users/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        status: "ok",
        data: {
          userId: 1,
          photoFilename: null,
          name: "QA",
          lastName: "Automation",
        },
      }),
    });
  });

  await page.goto("/panel/profile");

  await expect(page.getByText("QA Automation")).toBeVisible();
});
