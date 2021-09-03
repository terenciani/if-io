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

describe("Rota autenticação  /signin", function () {
  beforeAll(() => {
    insertUser()
  });
  afterAll(async () => {
    await removeAllUsers()
    closeTest()
  });
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
