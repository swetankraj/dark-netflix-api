const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A episode must have a title."],
  },
  season: Number,
  episode: Number,
  air_date: String,
  characters: [String],
});

const Episode = mongoose.model("Episode", episodeSchema);
module.exports = Episode;
