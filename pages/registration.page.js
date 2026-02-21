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
    this.errorMessage = page.locator(".invalid-feedback");
  }

  async openRegistrationModal() {
    await this.signUpButton.click();
  }

  async fillForm(user) {
    await this.nameInput.fill(user.name);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.password);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async expectError(text) {
    await expect(this.errorMessage).toContainText(text);
  }

  async expectRegisterDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }
}

module.exports = { RegistrationPage };
