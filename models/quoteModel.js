const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "A quote must have an Author."],
  },
  season: {
    type: Number,
    required: [true, "A quote must belong to a season."],
  },
  episode: {
    type: String,
    required: [true, "A quote must belong to a episode."],
  },
  quote: {
    type: String,
    required: [true, "A quote is required."],
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
