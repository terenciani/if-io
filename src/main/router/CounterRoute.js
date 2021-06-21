"use strict";
const CounterController = require("../controller/CounterController");

module.exports = class CounterRoute {
  constructor(app) {
    app.route("/increment").get(CounterController.increment);

    app.route("/decrement").get(CounterController.decrement);

    app.route("/counter").get(CounterController.getCounter);
  } // constructor()
}; // class
