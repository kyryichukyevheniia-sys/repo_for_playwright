const { test, expect } = require("../fixtures/userGarage.fixture");

test("User can see Add Car button", async ({ userGaragePage }) => {
  await expect(userGaragePage.addCarButton).toBeVisible();
});
