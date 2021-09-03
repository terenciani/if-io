const HTTPcodes = require("../HTTPcodes");

const globals = {
  catchError: {
    statusCode: HTTPcodes.BAD_REQUEST,
    code: "GL0001",
    message: "Erro interno ao processar sua requisição.",
  },
};

module.exports = globals;
