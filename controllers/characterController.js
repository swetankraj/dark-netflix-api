const characterData = require("../data/character.json");

exports.getAllCharacters = (req, res, next) => {
  res.status(200).json(characterData);
  next();
};

exports.getRandomCharacter = (req, res, next) => {
  const randomData =
    characterData[Math.floor(Math.random() * characterData.length)];
  res.status(200).json(randomData);
  next();
};
