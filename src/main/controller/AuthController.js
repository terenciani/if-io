"use strict";

const AuthService = require("../service/AuthService");
const helpers = require('../helpers/index');
const responseConstructor = (res) => (responsePayload) =>
  res.status(responsePayload.statusCode ? responsePayload.statusCode : helpers.HTTPcodes.OK).send(responsePayload);

module.exports = class AuthController {
  static async signIn(req, res) {
    const sendResponseToClient = responseConstructor(res);
    return sendResponseToClient(await AuthService.signIn(req.body));
  } // signin()

  static async validateIfTokenIsValid(req, res) {
    const sendResponseToClient = responseConstructor(res);
    return sendResponseToClient(await AuthService.isTokenValid(req.body));
  }
};
