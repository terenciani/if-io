"use strict";

const Mongoose = require("mongoose");
const User = Mongoose.model("User");

const customErrors = require("../helpers/customErrors");
const enumHelpers = require("../helpers/enumHelpers");
const TokenUtil = require("../utils/TokenUtil");


module.exports = class AuthService {
  static async signIn({ email , password}) {
    try {
      if (!email) return customErrors.auth.emailNotInformed;
      if (!password) return customErrors.auth.passwordNotInformed;

      const user = await User.findOne({email: email})
      
      if (!user) return customErrors.auth.emailNotFound;

      if (user.password != password) return customErrors.auth.passwordWrong;

      if (user.status != enumHelpers.users.status.active) return customErrors.auth.userInactive;
      
      const token = await TokenUtil.generateToken({
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        rule: user.rule
      });

      return await this.prepareUser(user, token);
    } catch (e) {
      return customErrors.globals.catchError;
    }
  } // signin()
  static async prepareUser(user, token) {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      rule: user.rule,
      status: user.status,
      token: token,
    };
  }
};
