"use strict";

const Counter = require("../singleton/Counter");

module.exports = class CounterService {
  static getCounter() {
    try {
      return { counter: Counter.getInstance().counter };
    } catch (e) {
      throw new Error("CounterService.getCounter: " + e.message);
    }
  } // getCounter()

  static increment() {
    try {
      Counter.getInstance().counter++;
      return { counter: Counter.getInstance().counter };
    } catch (e) {
      throw new Error("CounterService.increment: " + e.message);
    }
  } // increment()

  static decrement() {
    try {
      Counter.getInstance().counter--;
      return { counter: Counter.getInstance().counter };
    } catch (e) {
      throw new Error("CounterService.decrement: " + e.message);
    }
  } // decrement()
}; // class
