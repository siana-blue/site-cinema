const mongoose = require("mongoose");
const Person = require("./person");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String, required: true },
  director: { type: Schema.Types.ObjectId, ref: "Person" },
  rating: { type: Number, min: 1, max: 5 },
  actors: [{ type: Schema.Types.ObjectId, ref: "Person" }],
  length: {
    type: String,
    validator: function (v) {
      if (!v) return true;

      return /([0-9]+h[0-5][0-9]|[0-9]+m)/.test(v);
    },
    message: (p) => `${p} n'est pas une durée valide.`,
  },
  genre: { type: Schema.Types.ObjectId, ref: "Genre" },
});
MovieSchema.set("toJSON", { virtuals: true });

MovieSchema.virtual("imgURL").get(function () {
  return `/img/films/${this.title.replace("&#x27;", "'")}.webp`;
});

module.exports = mongoose.model("Movie", MovieSchema);
