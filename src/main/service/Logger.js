"use strict";

const chalk = require("chalk");

class Logger {
  static init() {
    global.logger = Logger;
  }

  static info(msg, tag) {
    console.log(chalk.yellow(`[${tag || "INFO"}] ${msg}`));
  }

  static success(msg, tag) {
    console.log(chalk.green(`[${tag || "SUCCESS"}] ${msg}`));
  }

  static error(msg, tag) {
    console.log(chalk.red(`[${tag || "ERROR"}] ${msg}`));
  }
}

module.exports = Logger.init();
