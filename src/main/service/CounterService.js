"use strict";

const CounterSingleton = require("../singleton/CounterSingleton");

const Mongoose = require("mongoose");
const Counter = Mongoose.model("Counter");

module.exports = class CounterService {
  static getCounter() {
    try {
      return { counter: CounterSingleton.getInstance().counter };
    } catch (e) {
      throw new Error("CounterService.getCounter: " + e.message);
    }
  } // getCounter()

  static increment() {
    try {
      CounterSingleton.getInstance().counter++;
      return { counter: CounterSingleton.getInstance().counter };
    } catch (e) {
      throw new Error("CounterService.increment: " + e.message);
    }
  } // increment()

  static decrement() {
    try {
      CounterSingleton.getInstance().counter--;
      return { counter: CounterSingleton.getInstance().counter };
    } catch (e) {
      throw new Error("CounterService.decrement: " + e.message);
    }
  } // decrement()
  static async saveCounter() {
    try {
      var lastHour = new Date();
      lastHour.setMinutes(0);
      lastHour.setSeconds(0);
      lastHour.setMilliseconds(0);
      let newestCounter = await Counter.findOne({ created_at: { $gte: lastHour } }).sort({
        created_at: -1,
      });
      if (newestCounter?.counter == CounterSingleton.getInstance().counter) return;

      await Counter.create({ counter: CounterSingleton.getInstance().counter });
    } catch (e) {
      throw new Error("CounterService.saveCounter: " + e.message);
    }
  } // saveCounter()

  static async initCounter() {
    try {
      let newestCounter = await Counter.findOne().sort({ created_at: -1 });
      CounterSingleton.getInstance().counter = newestCounter ? newestCounter.counter : 0;
    } catch (e) {
      throw new Error("CounterService.initCounter: " + e.message);
    }
  } // initCounter()
}; // class
