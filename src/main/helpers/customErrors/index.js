const auth = require("./authErrors");
const globals = require("./globalErrors");
const customErrors = {
  auth,
  globals,
};

module.exports = customErrors;
