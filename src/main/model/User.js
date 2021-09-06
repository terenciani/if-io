"use strict";

const Mongoose = require("mongoose");

module.exports = class User extends Mongoose.Schema {
  constructor() {
    super({
      name: String,
      lastname: String,
      email: String,
      password: String,
      rule: String,
      status: String,
      created_at: Date,
      accessed_at: Date,
    });
    Mongoose.model("User", this);
  } // constructor()
}; // class
