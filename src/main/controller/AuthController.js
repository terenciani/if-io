"use strict";

const AuthService = require("../service/AuthService");

const responseConstructor = (res) => (responsePayload) =>
  res.status(responsePayload.statusCode ? responsePayload.statusCode : 200).send(responsePayload);

module.exports = class AuthController {
  static async signIn(req, res) {
    const sendResponseToClient = responseConstructor(res);
    return sendResponseToClient(await AuthService.signIn(req.body));
  } // signin()
};
