const Character = require("../models/characterModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.getAllCharacters = factory.getAll(Character);
exports.getCharacter = factory.getOne(Character);
exports.updateCharacter = factory.updateOne(Character);
exports.deleteCharacter = factory.deleteOne(Character);

exports.getRandomCharacter = catchAsync(async (req, res, next) => {
  const character = req.query.name
    ? await Character.aggregate([
        { $match: { name: { $eq: req.query.name } } },
        { $sample: { size: 1 } },
      ])
    : await Character.aggregate([{ $sample: { size: 1 } }]);
  res.status(200).json({
    status: "success",
    data: character,
  });
});
