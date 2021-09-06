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
      res.status(200).send(CounterService.decrement());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("CounterController.decrement " + e.message);
    }
  } // decrement()
  static saveCounter() {
    try {
      CounterService.saveCounter();
    } catch (e) {
      global.logger.error("CounterController.saveCounter " + e.message);
    }
  } // saveCounter()

  static initCounter() {
    try {
      CounterService.initCounter();
    } catch (e) {
      global.logger.error("CounterService.initCounter " + e.message);
    }
  } // initCounter()

  static async getLastCountersByLimit(req, res) {
    try {
      res.status(200).send(await CounterService.getLastCountersByLimit(req.params));
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("CounterController.getLastCountersByLimit" + e.message);
    }
  } // getLastCountersByLimit()
}; // class
