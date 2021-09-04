"use strict";
const UserController = require("../controller/UserController");

const enumHelpers = require("../helpers/enumHelpers")
const AccessController = require("../controller/AccessController");

const managerAccess = new AccessController(enumHelpers.users.rules.manager);

module.exports = class UserRoute {
  constructor(app) {
    app.route("/user").get(managerAccess.verify, UserController.getUserList);
  } // constructor()
}; // class
