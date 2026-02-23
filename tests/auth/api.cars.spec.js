const { test, expect } = require("@playwright/test");

test.describe("API - Cars", () => {
  let requestContext;

  test.beforeAll(async ({ playwright }) => {
    requestContext = await playwright.request.newContext({
      baseURL: process.env.BASE_URL,
      httpCredentials: {
        username: process.env.HTTP_USERNAME,
        password: process.env.HTTP_PASSWORD,
      },
      storageState: "storageState.json",
    });
  });

  test.afterAll(async () => {
    await requestContext.dispose();
  });

  test("Create car - positive", async () => {
    const response = await requestContext.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.data.mileage).toBe(100);
  });

  test("Create car - missing brand", async () => {
    const response = await requestContext.post("/api/cars", {
      data: {
        carModelId: 1,
        mileage: 100,
      },
    });

    expect(response.status()).toBe(400);
  });

  test("Create car - invalid mileage", async () => {
    const response = await requestContext.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -10,
      },
    });

    expect(response.status()).toBe(400);
  });
});
