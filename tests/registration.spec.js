const { test, expect } = require("@playwright/test");

function generateUser() {
  const timestamp = Date.now();
  return {
    name: "John",
    lastName: "Smith",
    email: `aqa-${timestamp}@test.com`,
    password: "Qwerty123",
  };
}

test.describe("Registration tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click('button:has-text("Sign up")');
  });

  // ✅ POSITIVE
  test("Positive: successful registration", async ({ page }) => {
    const user = generateUser();

    await page.fill("#signupName", user.name);
    await page.keyboard.press("Tab");

    await page.fill("#signupLastName", user.lastName);
    await page.keyboard.press("Tab");

    await page.fill("#signupEmail", user.email);
    await page.keyboard.press("Tab");

    await page.fill("#signupPassword", user.password);
    await page.keyboard.press("Tab");

    await page.fill("#signupRepeatPassword", user.password);
    await page.keyboard.press("Tab");

    await page.locator("body").click(); // 🔥 важливо

    const registerBtn = page.locator('button:has-text("Register")');
    await expect(registerBtn).toBeEnabled();
    await registerBtn.click();
  });

  // ❌ EMPTY NAME
  test("Negative: empty name", async ({ page }) => {
    const user = generateUser();

    await page.fill("#signupName", "");
    await page.keyboard.press("Tab"); // 🔥 важливо

    await page.fill("#signupLastName", user.lastName);
    await page.keyboard.press("Tab");

    await page.fill("#signupEmail", user.email);
    await page.keyboard.press("Tab");

    await page.fill("#signupPassword", user.password);
    await page.keyboard.press("Tab");

    await page.fill("#signupRepeatPassword", user.password);
    await page.keyboard.press("Tab");

    await expect(
      page.locator("div.invalid-feedback").filter({ hasText: "Name required" }),
    ).toBeVisible();
  });

  // ❌ INVALID EMAIL
  test("Negative: invalid email", async ({ page }) => {
    const user = generateUser();

    await page.fill("#signupName", user.name);
    await page.keyboard.press("Tab");

    await page.fill("#signupLastName", user.lastName);
    await page.keyboard.press("Tab");

    await page.fill("#signupEmail", "aqa-invalid");
    await page.keyboard.press("Tab");

    await expect(page.locator(".invalid-feedback")).toContainText(
      "Email is incorrect",
    );
  });

  // ❌ PASSWORDS DO NOT MATCH
  test("Negative: passwords do not match", async ({ page }) => {
    const user = generateUser();

    await page.fill("#signupName", user.name);
    await page.keyboard.press("Tab");

    await page.fill("#signupLastName", user.lastName);
    await page.keyboard.press("Tab");

    await page.fill("#signupEmail", user.email);
    await page.keyboard.press("Tab");

    await page.fill("#signupPassword", user.password);
    await page.keyboard.press("Tab");

    await page.fill("#signupRepeatPassword", "Different1");
    await page.keyboard.press("Tab");

    await expect(
      page
        .locator("div.invalid-feedback")
        .filter({ hasText: "Passwords do not match" }),
    ).toBeVisible();
  });

  // ❌ SHORT NAME
  test("Negative: short name", async ({ page }) => {
    const user = generateUser();

    await page.fill("#signupName", "J");
    await page.locator("#signupName").blur();

    await expect(page.locator(".invalid-feedback")).toContainText(
      "2 to 20 characters",
    );
  });
});
