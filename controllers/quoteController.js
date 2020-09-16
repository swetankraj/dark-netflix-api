const Quote = require("../models/quoteModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.getAllQuotes = factory.getAll(Quote);
exports.getQuote = factory.getOne(Quote);
exports.updateQuote = factory.updateOne(Quote);
exports.deleteQuote = factory.deleteOne(Quote);

exports.getRandomQuote = catchAsync(async (req, res, next) => {
  const quote = req.query.author
    ? await Quote.aggregate([
        { $match: { author: { $eq: req.query.author } } },
        { $sample: { size: 1 } },
      ])
    : await Quote.aggregate([{ $sample: { size: 1 } }]);
  res.status(200).json({
    status: "success",
    data: quote,
  });
});
