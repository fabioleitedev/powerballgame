const express = require("express");
const routes = require("./routes");

// Create Express App
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/", routes);

module.exports = app;
