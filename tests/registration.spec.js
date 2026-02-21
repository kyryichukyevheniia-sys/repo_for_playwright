const { test } = require("@playwright/test");
const { RegistrationPage } = require("../pages/registration.page");
const { generateUser } = require("../utils/userFactory");

test.describe("Registration - Page Object refactor", () => {
  test.beforeEach(async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();
  });

  test("Positive: successful registration", async ({ page }) => {
    const registration = new RegistrationPage(page);
    const user = generateUser();

    await registration.fillForm(user);
    await registration.expectRegisterEnabled();
    await registration.submit();
  });

  test("Negative: empty name", async ({ page }) => {
    const registration = new RegistrationPage(page);
    const user = generateUser();

    await registration.fillForm({
      ...user,
      name: "",
    });

    await registration.expectError("Name required");
  });

  test("Negative: invalid email", async ({ page }) => {
    const registration = new RegistrationPage(page);
    const user = generateUser();

    await registration.fillForm({
      ...user,
      email: "aqa-invalid",
    });

    await registration.expectError("Email is incorrect");
  });

  test("Negative: passwords do not match", async ({ page }) => {
    const registration = new RegistrationPage(page);
    const user = generateUser();

    await registration.fillField(registration.nameInput, user.name);
    await registration.fillField(registration.lastNameInput, user.lastName);
    await registration.fillField(registration.emailInput, user.email);
    await registration.fillField(registration.passwordInput, user.password);
    await registration.fillField(registration.repeatPasswordInput, "Wrong123");

    await registration.expectError("Passwords do not match");
  });
});
