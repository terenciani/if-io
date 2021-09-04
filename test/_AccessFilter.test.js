const supertest = require("supertest");
const { sign } = require('jsonwebtoken');
const { app, server } = require("../AppTest");
const customErrors = require("../src/main/helpers/customErrors");
const { enumHelpers } = require('../src/main/helpers/index');

const Mongoose = require("mongoose");
const User = Mongoose.model("User");

async function insertUser() {
  await User.insertMany([{
      name: "Tester",
      email: "testeok@teste.com",
      password: "54321",
      rule: enumHelpers.users.rules.manager,
      status: enumHelpers.users.status.active
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
  insertUser();
});
afterAll(()=>{
  removeAllUsers();
});

describe("Rotas publicas", function () {
  it("Route /", async () => {
    const {statusCode} = await supertest(app).get("/")
    expect(statusCode).toBe(200);
  });
});

const commonRoutes = ["/counter", "/increment"]


describe("Rotas do usuário comum", function () {
  commonRoutes.forEach(async (route) => {
    it(`Dados do token fora de padrão ${route}`, async () => {
      const jsonData = {
        email: "testeok@teste.com",
        password: "54321",
      };
  
      token = sign({ jsonData }, global.config.jwt.secret, { expiresIn: '30m' });

      const {body} = await supertest(app).get(route).set('x-access-token', token);
  
      const erro = customErrors.auth.accessDenied;
  
      expect(body.statusCode).toBe(erro.statusCode);
      expect(body.code).toBe(erro.code);
      expect(body.message).toBe(erro.message);
    });
    it(`Token expirado ${route}`, async () => {
      const jsonData = {
        email: "testeok@teste.com",
        password: "54321",
      };
  
      token = sign({ jsonData }, global.config.jwt.secret, { expiresIn: 0 });
      
      const {body} = await supertest(app).get(route).set('x-access-token', token);
  
      const erro = customErrors.auth.expiredToken;
  
      expect(body.statusCode).toBe(erro.statusCode);
      expect(body.code).toBe(erro.code);
      expect(body.message).toBe(erro.message);
    });
    it(`Token inválido ${route}`, async () => {
      const {body} = await supertest(app).get(route).set('x-access-token', 'token_inválido');
  
      const  error = customErrors.auth.invalidToken;
  
      expect(body.statusCode).toBe(error.statusCode);
      expect(body.code).toBe(error.code);
      expect(body.message).toBe(error.message);
    });
    it(`Token não fornecido ${route}`, async () => {
      const {body} = await supertest(app).get(route)
  
      const  error = customErrors.auth.tokenNotProvided;
  
      expect(body.statusCode).toBe(error.statusCode);
      expect(body.code).toBe(error.code);
      expect(body.message).toBe(error.message);
    });
  })
});


