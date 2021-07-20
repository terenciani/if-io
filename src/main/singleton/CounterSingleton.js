class PrivateCounter {
  constructor() {
    this.counter = 0;
  }
}
class CounterSingleton {
  constructor() {
    throw new Error("Use CounterSingleton.getInstance()");
  }
  static getInstance() {
    if (!CounterSingleton.instance) {
      CounterSingleton.instance = new PrivateCounter();
    }
    return CounterSingleton.instance;
  }
}

module.exports = CounterSingleton;
