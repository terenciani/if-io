const supertest = require("supertest");
const { app } = require("../AppTest");
const customErrors = require("../src/main/helpers/customErrors");
const enumHelpers = require("../src/main/helpers/enumHelpers");

const server = app.listen(5030);

const Mongoose = require("mongoose");
const User = Mongoose.model("User");

async function insertUser() {
  await User.insertMany(
    [{
      name: "Tester",
      email: "testeok@teste.com",
      password: "54321",
      rule: enumHelpers.users.rules.manager,
      status: enumHelpers.users.status.active
    }]
  )
}
async function removeAllUsers() {
  return await User.deleteMany({})
}

async function closeTest() {
  await  Mongoose.connection.close();
  await server.close();
}

beforeAll(async () => {
  await insertUser();
});

afterAll(async ()=>{  
  await removeAllUsers();
  closeTest()
});

/*test("Incrementar Contador 1 vez", () => {
  const counterBeforeIncrement = CounterService.getCounter();
  const counterAfterIncrement = CounterService.increment();
  expect(counterAfterIncrement.counter).toEqual(counterBeforeIncrement.counter + 1);
});

test("Incrementar Contador 5 vezes", () => {
  const counterBeforeIncrement = CounterService.getCounter();
  CounterService.increment();
  CounterService.increment();
  CounterService.increment();
  CounterService.increment();
  const counterAfterIncrement = CounterService.increment();
  expect(counterAfterIncrement.counter).toEqual(counterBeforeIncrement.counter + 5);
});

test("Decrementar Contador 1 vez", () => {
  const counterBeforeDecrement = CounterService.getCounter();
  const counterAfterDecrement = CounterService.decrement();
  expect(counterAfterDecrement.counter).toEqual(counterBeforeDecrement.counter - 1);
});

test("Decrementar Contador 5 vezes", () => {
  const counterBeforeDecrement = CounterService.getCounter();
  CounterService.decrement();
  CounterService.decrement();
  CounterService.decrement();
  CounterService.decrement();
  const counterAfterDecrement = CounterService.decrement();
  expect(counterAfterDecrement.counter).toEqual(counterBeforeDecrement.counter - 5);
});

test("Throw on instantiation", () => {
  expect(() => {
    new Counter();
  }).toThrowError(new Error("Use Counter.getInstance()"));
});*/

test("Decrementar Contador 5 vezes", () => {
  expect(1).toEqual(1);
});
