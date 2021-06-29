"use strict";

const UserService = require("../service/UserService");

module.exports = class UserController {
  static async getUserList(req, res) {
    try {
      res.status(200).send(await UserService.getUserList());
    } catch (e) {
      res.status(500).send(e.message);
      global.logger.error("UserController.getUserList" + e.message);
    }
  } // getUserList()
};
