"use strict";

const Mongoose = require("mongoose");
const User = Mongoose.model("User");

const { customErrors } = require("../helpers");

module.exports = class UserService {
  static async getUserList() {
    try {
      return await User.find({});
    } catch (e) {
      throw new Error("UserService.getUserList: " + e.message);
    }
  } // getUserList()
  static async findById(userId){
    try {
      return await User.findById(userId);
    } catch (error) {
      return customErrors.globals.catchError;
    }
  } // findById()
};
