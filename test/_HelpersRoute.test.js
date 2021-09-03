const supertest = require("supertest");
const { app } = require("../AppTest");
const { enumHelpers } = require('../src/main/helpers/index');

describe("Rota enums  /helpers", function () {
  it("Get helpers", async () => {
    const {body, statusCode} = await supertest(app).get("/helpers")
    expect(statusCode).toBe(200);
    expect(body).toEqual(enumHelpers);
  });
});
