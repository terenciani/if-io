"use strict";

require("./src/main/service/Logger");
require("./config");

const express = require("express");
const cors = require("cors");
const Loader = require("./Loader");
const Server = require("./Server");
const schedule = require("node-schedule");
const ConnectionFactory = require("./src/main/connection/ConnectionFactory");

class App {
  static async init() {
    let app = new Server();

    try {
      global.logger.info("Connecting to database...");
      await ConnectionFactory.getConnection();
      global.logger.success("Database connected successfully!");
    } catch (error) {
      global.logger.error(`Error connecting to database: ${error.message}`);
      process.exit(1);
    }

    app.use(cors());
    // parse requests of content-type - application/json
    app.use(express.json());

    Loader.loadAll(app);

    const CounterController = require("./src/main/controller/CounterController");

    CounterController.initCounter();

    schedule.scheduleJob(`*/1 * * * *`, function () {
      CounterController.saveCounter();
    });

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
  }
}

App.init();
