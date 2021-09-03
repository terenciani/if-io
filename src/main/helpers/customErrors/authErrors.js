const HTTPcodes = require("../HTTPcodes");

const auth = {
  emailNotInformed: {
    statusCode: HTTPcodes.EXPECTATION_FAILED,
    code: "AUTH0001",
    message: "O e-mail deve ser informado.",
  },
  passwordNotInformed: {
    statusCode: HTTPcodes.EXPECTATION_FAILED,
    code: "AUTH0002",
    message: "A senha deve ser informada.",
  },
  emailNotFound: {
    statusCode: HTTPcodes.UNAUTHORIZED,
    code: "AUTH0003",
    message: "E-mail não encontrado.",
  },
  passwordWrong: {
    statusCode: HTTPcodes.UNAUTHORIZED,
    code: "AUTH0004",
    message: "A senha informada está incorreta.",
  },  
  userInactive: {
    statusCode: HTTPcodes.UNAUTHORIZED,
    code: "AUTH0005",
    message: "O e-mail informado não está ativo.",
  },
};

module.exports = auth;
