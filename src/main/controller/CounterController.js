"use strict";

const Counter = require("../counter/Counter");

module.exports = class CounterController {
  static async increment(req, res) {
    try {
      Counter.getInstance().counter++;
      res.status(200).send({ counter: Counter.getInstance().counter });
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("CounterController.increment" + e.message);
    }
  } // login()

  static async getCounter(req, res) {
    try {
      res.status(200).send({ counter: Counter.getInstance().counter });
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("CounterController.getCounter" + e.message);
    }
  } // login()

  static async decrement(req, res) {
    try {
      Counter.getInstance().counter--;
      res.status(200).send({ counter: Counter.getInstance().counter });
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("CounterController.decrement " + e.message);
    }
  } // listarTodos()
}; // class
