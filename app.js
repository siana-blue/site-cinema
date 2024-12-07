const express = require("express");
const path = require("path");
const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { mongoDB } = require("./var");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Définition des routes
const moviesRouter = require("./routes/movies");
const dbRouter = require("./routes/db");
const pageRouter = require("./routes/page");

app.use("/movies", moviesRouter);
app.use("/db", dbRouter);
app.use("/", pageRouter);

// error handler
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).render("err", { error: err });
});

module.exports = app;
