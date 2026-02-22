const base = require("@playwright/test");
const { GaragePage } = require("../../pages/GaragePage");

const test = base.test.extend({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
  },
});

module.exports = {
  test,
  expect: base.expect,
};
