"use strict";

require("./src/main/service/Logger");
require("./config");
const express = require("express");
const path = require("path");
const Loader = require("./Loader");
const mongoose = require("mongoose");

const app = express();

try {
  mongoose.connect(`mongodb://${global.config.dbTest.url}/${global.config.dbTest.name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  process.exit(1);
}

global.appRoot = path.resolve(__dirname);

// parse requests of content-type - application/json
app.use(
  express.json({
    limit: "50mb",
  })
);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

Loader.loadAll(app);

// simple route
app.get("/", (req, res) => {
  res.json({
    project: "Plataforma de Gerenciamento de Associações",
    version: "beta",
    author: "IFPR-Paranavaí",
  });
});

module.exports = { app };
