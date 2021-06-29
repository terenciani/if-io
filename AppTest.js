"use strict";

require("./src/main/service/Logger");
require("./config");
const ConnectionFactory = require("./src/main/connection/ConnectionFactory");
const express = require("express");
// const cors = require("cors");
const Loader = require("./Loader");
const Server = require("./Server");

class App {
  static async init() {
    let app = new Server();

    // app.use(cors());

    try {
      global.logger.info("Establishing the database connection...");
      await ConnectionFactory.getConnection();
      global.logger.success("Database connected successfully!");
    } catch (error) {
      global.logger.error(`Database connecting error: ${error.message}`);
      process.exit(1);
    }

    // parse requests of content-type - application/json
    app.use(express.json());

    Loader.loadAll(app);

    // simple route
    app.get("/", (req, res) => {
      res.json({
        project: "IF.IO API",
        version: "1.0.0",
        author: "Prof. Marcelo F. Terenciani",
      });
    });

    // set port, listen for requests
    const PORT = process.env.PORT || 2000;
    app.listen(PORT, () => {
      global.logger.success(`IF.IO - API: port ${PORT}`);
    });

    return app;
  }
}

module.exports = App;
