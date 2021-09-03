"use strict";
const helpers = require('../helpers/index');
const responseConstructor = (res) => (responsePayload) =>
  res.status(responsePayload.statusCode ? responsePayload.statusCode : helpers.HTTPcodes.OK).send(responsePayload);

module.exports = class HelpersController {
  static async getHelpers(req, res) {
    const sendResponseToClient = responseConstructor(res);
    return sendResponseToClient(helpers.enumHelpers);
  } // getHelpers()
};
