const { expect } = require("@playwright/test");

class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.signUpButton = page.locator('button:has-text("Sign up")');
    this.nameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repeatPasswordInput = page.locator("#signupRepeatPassword");
    this.registerButton = page.locator('button:has-text("Register")');
  }

  async open() {
    await this.page.goto("/");
    await this.signUpButton.click();
  }

  async fillField(field, value) {
    await field.fill(value);
    await this.page.keyboard.press("Tab");
  }

  async fillForm(user) {
    await this.fillField(this.nameInput, user.name);
    await this.fillField(this.lastNameInput, user.lastName);
    await this.fillField(this.emailInput, user.email);
    await this.fillField(this.passwordInput, user.password);
    await this.fillField(this.repeatPasswordInput, user.password);
  }

  async submit() {
    await this.page.locator("body").click();
    await this.registerButton.click();
  }

  async registerValidUser(user) {
    await this.fillForm(user);
    await this.submit();
  }

  async expectError(text) {
    await expect(
      this.page.locator("div.invalid-feedback").filter({ hasText: text }),
    ).toBeVisible();
  }

  async expectRegisterEnabled() {
    await this.page.locator("body").click();
    await expect(this.registerButton).toBeEnabled();
  }
}

module.exports = { RegistrationPage };
