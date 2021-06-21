"use strict";

require("./src/main/service/Logger");

const express = require("express");
// const cors = require("cors");
const Loader = require("./Loader");
const Server = require("./Server");

class App {
  static async init() {
    let app = new Server();

    // app.use(cors());

    // parse requests of content-type - application/json
    app.use(express.json());

    Loader.loadAll(app);

    // simple route
    app.get("/", (req, res) => {
      res.json({
        project: "IF.IO API",
        version: "beta",
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
