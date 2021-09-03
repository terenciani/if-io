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
  invalidToken:{
    statusCode: HTTPcodes.UNAUTHORIZED,
    code: "AUTH0006",
    message: "Não foi possível validar o token fornecido.",
  },
  tokenNotProvided: {
    statusCode: HTTPcodes.EXPECTATION_FAILED,
    code: "AUTH0007",
    message: "O token deve ser fornecido para validação.",
  },
};

module.exports = auth;
