const Episode = require("../models/episodeModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.getAllEpisodes = factory.getAll(Episode);
exports.getEpisode = factory.getOne(Episode);
exports.updateEpisode = factory.updateOne(Episode);
exports.deleteEpisode = factory.deleteOne(Episode);

exports.getRandomEpisode = catchAsync(async (req, res, next) => {
  const episode = req.query.season
    ? await Episode.aggregate([
        { $match: { season: { $eq: req.query.season * 1 } } },
        { $sample: { size: 1 } },
      ])
    : await Episode.aggregate([{ $sample: { size: 1 } }]);
  res.status(200).json({
    status: "success",
    data: episode,
  });
});
