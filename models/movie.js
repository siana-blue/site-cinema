const mongoose = require("mongoose");
const { movieTags, movieVersions } = require("../var");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  tmdb_id: Number,
  sessions: [
    {
      date: { type: Date, required: true },
      startingTime: {
        type: String,
        match: /^([0-1][0-9])|2[0-3]h[0-5][0-9]$/,
        required: true,
      },
      room: { type: Number, min: 1, max: 2, required: true },
      version: { type: String, enum: movieVersions },
    },
  ],
  tags: [{ type: String, enum: movieTags }],
});

module.exports = mongoose.model("Movie", MovieSchema);
