const supertest = require("supertest");
const { app, server } = require("../AppTest");
const customErrors = require("../src/main/helpers/customErrors");
const enumHelpers = require("../src/main/helpers/enumHelpers");

const Mongoose = require("mongoose");
const User = Mongoose.model("User");

async function insertUser() {
  await User.insertMany([{
      name: "Tester",
      email: "testeok@teste.com",
      password: "54321",
      rule: enumHelpers.users.rules.manager,
      status: enumHelpers.users.status.active

  },
  {
    name: "Tester Inativo",
    email: "testeinativo@teste.com",
    password: "54321",
    rule: enumHelpers.users.rules.users,
    status: enumHelpers.users.status.inactive

}])
}
async function removeAllUsers() {
  return await User.deleteMany({})
}
function closeTest() {    
  server.close();
  Mongoose.connection.close();
}

beforeAll(() => {
  insertUser()
});
afterAll(async () => {
  await removeAllUsers()
  closeTest()
});

describe("Rota autenticação  /signin", function () {
  it("Login bem sucedido", async () => {
    const jsonData = {
      email: "testeok@teste.com",
      password: "54321",
    };

    const {body, statusCode} = await supertest(app).post("/signin").send(jsonData);

    console.log(statusCode)

    expect(statusCode).toBe(200);
    expect(body.email).toBe(jsonData.email);
  });
  it("Usuário inativo", async () => {
    const jsonData = {
      email: "testeinativo@teste.com",
      password: "54321",
    };

    const { body } = await supertest(app).post("/signin").send(jsonData);

    const erro = customErrors.auth.userInactive;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
  it("Try-catch", async () => {
    const jsonData = {
      email: "teste@teste.com",
      password: "12345"
    };
    const { body } = await supertest(app).post("/signin").send({email: jsonData, password: jsonData});

    const erro = customErrors.globals.catchError;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
  it("Senha Errada", async () => {
    const jsonData = {
      email: "testeok@teste.com",
      password: "12345",
    };
    const { body } = await supertest(app).post("/signin").send(jsonData);

    const erro = customErrors.auth.passwordWrong;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
  it("E-mail não encontrado", async () => {
    const jsonData = {
      email: "teste@teste.com",
      password: "12345",
    };
    const { body } = await supertest(app).post("/signin").send(jsonData);

    const erro = customErrors.auth.emailNotFound;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
  it("Requisição sem e-mail", async () => {
    const jsonData = {
      password: "12345",
    };
    const { body } = await supertest(app).post("/signin").send(jsonData);

    const erro = customErrors.auth.emailNotInformed;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
  it("Requisição sem senha", async () => {
    const jsonData = {
      email: "teste@teste.com",
    };
    const { body } = await supertest(app).post("/signin").send(jsonData);

    const erro = customErrors.auth.passwordNotInformed;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
});

describe("Rota validação de token  /validate-token", function () {
  it("Token expirado", async () => {
    const { sign } = require('jsonwebtoken');
    const jsonData = {
      email: "testeok@teste.com",
      password: "54321",
    };

    token = sign({ jsonData }, global.config.jwt.secret, { expiresIn: 0 });
    
    const {body} = await supertest(app).post("/validate-token").send({token: token});
    
    const erro = customErrors.auth.expiredToken;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
  it("Token válido", async () => {
    const jsonData = {
      email: "testeok@teste.com",
      password: "54321",
    };
    const response = await supertest(app).post("/signin").send(jsonData);
    const {body, statusCode} = await supertest(app).post("/validate-token").send({token: response.body.token});
    
    console.log(body)
    expect(statusCode).toBe(200);
    expect(body.isValid).toBe(true);
  });
  it("Token inválido", async () => {
    const {body} = await supertest(app).post("/validate-token").send({token: "123412413241324"});

    const erro = customErrors.auth.invalidToken;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
  it("Token não fornecido", async () => {
    const {body} = await supertest(app).post("/validate-token")

    const erro = customErrors.auth.tokenNotProvided;

    expect(body.statusCode).toBe(erro.statusCode);
    expect(body.code).toBe(erro.code);
    expect(body.message).toBe(erro.message);
  });
});
