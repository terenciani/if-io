"use strict";
const CounterController = require("../controller/CounterController");
const enumHelpers = require("../helpers/enumHelpers")
const AccessController = require("../controller/AccessController");

const commonAccess = new AccessController(enumHelpers.users.rules.server);
const managerAccess = new AccessController(enumHelpers.users.rules.manager);

module.exports = class CounterRoute {
  constructor(app) {
    app.route("/increment").get(commonAccess.verify, CounterController.increment);

    app.route("/decrement").get(commonAccess.verify, CounterController.decrement);

    app.route("/counter").get(commonAccess.verify, CounterController.getCounter);
  } // constructor()
}; // class
