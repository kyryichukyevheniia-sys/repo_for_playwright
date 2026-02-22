class GaragePage {
  constructor(page) {
    this.page = page;
    this.addCarButton = page.locator('button:has-text("Add car")');
  }

  async open() {
    await this.page.goto("/panel/garage");
  }

  async clickAddCar() {
    await this.addCarButton.click();
  }
}

module.exports = { GaragePage };
