"use strict";

const Mongoose = require("mongoose");

module.exports = class Counter extends Mongoose.Schema {
  constructor() {
    super({
      counter: Number,
      created_at: {
        type: Date,
        default: Date.now,
      },
    });
    Mongoose.model("Counter", this);
  } // constructor()
}; // class
