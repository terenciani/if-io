const Mongoose = require("mongoose");
const Counter = Mongoose.model("Counter");

const CounterSingleton = require("../singleton/CounterSingleton");

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
  static async getLastCountersByLimit({limit}) {
    try {
      let result = await Counter.find({}).sort({ created_at: -1 }).limit(Number(limit));
      return result
    } catch (e) {
      console.log(e)
      throw new Error("CounterService.getLastCountersByLimit: " + e.message);
    }
  } // getLastCountersByLimit()
}; // class
