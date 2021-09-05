/*
const { app, mongoose } = require("../AppTest");
const { enumHelpers } = require('../src/main/helpers/index');
const NodeEnvironment = require("jest-environment-node");

class ExpressEnvironment extends NodeEnvironment{
    constructor(config, context){
        super(config, context)
    }
    async setup(){
        await super.setup();
        this.global.app = await app;
        this.global.mongoose = mongoose;
        this.global.say = "Hello";
        await this.populateUsers();
    }
    async populateUsers(){
        const User = mongoose.model("User");
        await User.insertMany([
            {
              name: "Tester",
              email: "testeok@teste.com",
              password: "54321",
              rule: enumHelpers.users.rules.manager,
              status: enumHelpers.users.status.active
            },
            {
              name: "Tester sem Rule",
              email: "testenorule@teste.com",
              password: "54321",
              status: enumHelpers.users.status.active
            },
            {
              name: "Tester Inativo",
              email: "testerinativo@teste.com",
              password: "54321",
              status: enumHelpers.users.status.inactive,
              rule: enumHelpers.users.rules.manager,
            }
        ])
        console.log(await User.find({}))
    }
}
module.exports = ExpressEnvironment;
*/