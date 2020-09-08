const express = require("express");
const quoteController = require("../controllers/quoteController");
const router = express.Router();

router.route("/").get(quoteController.getAllQuotes);
router.route("/random").get(quoteController.getRandomQuote);

module.exports = router;
