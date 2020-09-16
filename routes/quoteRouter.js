const express = require("express");
const quoteController = require("../controllers/quoteController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/").get(quoteController.getAllQuotes);
router.route("/random").get(quoteController.getRandomQuote);

router
  .route("/:id")
  .get(quoteController.getQuote)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "contr"),
    quoteController.updateQuote
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "contr"),
    quoteController.deleteQuote
  );

module.exports = router;
