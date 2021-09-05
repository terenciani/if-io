const supertest = require("supertest");
const Mongoose = require("mongoose");
const { app } = require("../AppTest");
const { enumHelpers } = require('../src/main/helpers/index');
const server = app.listen(5040);

async function closeTest() {
  await  Mongoose.connection.close();
  await server.close();
}

afterAll(async ()=>{
  closeTest()
});

describe("Rota enums  /helpers", function () {
  it("Get helpers", async () => {
    const {body, statusCode} = await supertest(app).get("/helpers")
    expect(statusCode).toBe(200);
    expect(body).toEqual(enumHelpers);
  });
});
