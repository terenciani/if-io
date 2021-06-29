"use strict";
const UserController = require("../controller/UserController");

module.exports = class UserRoute {
  constructor(app) {
    app.route("/user").get(UserController.getUserList);
  } // constructor()
}; // class
