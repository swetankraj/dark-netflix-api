const quotesData = require("../data/quotes.json");

exports.getAllQuotes = (req, res, next) => {
  res.status(200).json(quotesData);
  next();
};

exports.getRandomQuote = (req, res, next) => {
  const randomData = quotesData[Math.floor(Math.random() * quotesData.length)];
  res.status(200).json(randomData);
  next();
};
