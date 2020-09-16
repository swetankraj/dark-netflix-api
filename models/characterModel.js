const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A character must have a name."],
  },
  born: Number,
  occupation: [String],
  img: String,
  status: String,
  aliases: [String],
  appearance: [Number],
  portrayed: [
    {
      young: String,
      adult: String,
      old: String,
    },
  ],
  first_appearance: String,
  residence: String,
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
