"use strict";
const HelpersController = require("../controller/HelpersController");

module.exports = class HelpersRoute {
  constructor(app) {
    app.route("/helpers").get(HelpersController.getHelpers);
  } // constructor()
}; // class
