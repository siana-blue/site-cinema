const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
});

module.exports = mongoose.model("Genre", GenreSchema);
