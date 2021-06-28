"use strict";

const CounterService = require("../service/CounterService");

module.exports = class CounterController {
  static async increment(req, res) {
    try {
      res.status(200).send(CounterService.increment());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("CounterController.increment" + e.message);
    }
  } // increment()

  static async getCounter(req, res) {
    try {
      res.status(200).send(CounterService.getCounter());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("CounterController.getCounter" + e.message);
    }
  } // getCounter()

  static async decrement(req, res) {
    try {
      Counter.getInstance().counter--;
      res.status(200).send({ counter: Counter.getInstance().counter });
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("CounterController.decrement " + e.message);
    }
  } // decrement()
}; // class
