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
    statusCode: HTTPcodes.BAD_REQUEST,
    code: "AUTH0006",
    message: "Não foi possível validar o token fornecido.",
  },
  tokenNotProvided: {
    statusCode: HTTPcodes.EXPECTATION_FAILED,
    code: "AUTH0007",
    message: "O token deve ser fornecido para validação.",
  },
  expiredToken: {
    statusCode: HTTPcodes.UNAUTHORIZED,
    code: "AUTH0008",
    message: "O token de acesso fornecido expirou. Realize o login novamente.",
  },
  errorOnValidateToken: {
    statusCode: HTTPcodes.UNPROCESSABLE_ENTITY,
    code: 'AUTH0009',
    message: 'Erro ao verificar o token.'
  },
  accessDenied: {
    statusCode: HTTPcodes.FORBIDDEN,
    code: "AUTH0010",
    message: "Área restrita.",
  },
  unauthorized: {
    statusCode: HTTPcodes.UNAUTHORIZED,
    code: "AUTH0011",
    message: "Acesso não autorizado.",
  },
};

module.exports = auth;
