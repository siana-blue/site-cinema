const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Définition des routes
const updateRouter = require("./routes/update");

app.use("/form", updateRouter);

module.exports = app;
