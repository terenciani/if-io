"use strict";

const Mongoose = require("mongoose");
const User = Mongoose.model("User");

module.exports = class UserService {
  static async getUserList() {
    try {
      return await User.find({});
    } catch (e) {
      throw new Error("UserService.getUserList: " + e.message);
    }
  } // getUserList()
};