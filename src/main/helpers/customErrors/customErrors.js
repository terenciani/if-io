const codigosHTTP = require("../HTTPcodes");

const associado = {
  emailPrincipalEAlternativosIguais: {
    statusCode: codigosHTTP.EXPECTATION_FAILED,
    code: "ASS0001",
    message: "O e-mail principal e o alternativo não podem ser iguais.",
  },
  cpfInvalido: {
    statusCode: codigosHTTP.EXPECTATION_FAILED,
    code: "ASS0002",
    message: "O CPF informado é inválido.",
  },
  emailOuCPFjaCadastrados: {
    statusCode: codigosHTTP.EXPECTATION_FAILED,
    code: "ASS0003",
    message: "E-mail ou CPF já cadastrados.",
  },
  imagemNaoAnexada: {
    statusCode: codigosHTTP.EXPECTATION_FAILED,
    code: "ASS0004",
    message: "A foto do associado não foi anexada.",
  },
};

module.exports = associado;
