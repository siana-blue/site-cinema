const mongoose = require("mongoose");
const Person = require("./person");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String, required: true },
  director: { type: Schema.Types.ObjectId, ref: "Person" },
  rating: { type: Number, min: 1, max: 5 },
  actors: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});
MovieSchema.set("toJSON", { virtuals: true });

MovieSchema.virtual("imgURL").get(function () {
  return `/img/films/${this.title.replace("&#x27;", "'")}.webp`;
});

module.exports = mongoose.model("Movie", MovieSchema);
