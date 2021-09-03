const Counter = require("../src/main/singleton/CounterSingleton");
const CounterService = require("../src/main/service/CounterService");

test("Incrementar Contador 1 vez", () => {
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
});
