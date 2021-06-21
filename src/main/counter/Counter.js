class PrivateCounter {
  constructor() {
    this.message = "I am an instance";
    this.counter = 0;
  }
}
class Counter {
  constructor() {
    throw new Error("Use Counter.getInstance()");
  }
  static getInstance() {
    if (!Counter.instance) {
      Counter.instance = new PrivateCounter();
    }
    return Counter.instance;
  }
}
module.exports = Counter;
