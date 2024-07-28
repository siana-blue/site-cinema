const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String, required: true },
  director: { type: String, maxLength: 100 },
  rating: { type: Number, min: 1, max: 5 },
});

MovieSchema.virtual("imgURL").get(function () {
  return `/img/films/${this.title}.webp`;
});

module.exports = mongoose.model("Movie", MovieSchema);
