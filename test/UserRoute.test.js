const supertest = require("supertest");
const App = require("../AppTest");

test("get user list", async () => {
  const app = await App.init();
  const response = await supertest(app).get("/user");
  expect(Array.isArray(response.body)).toEqual(Array.isArray(new Array()));
});
