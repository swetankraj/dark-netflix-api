const express = require("express");
const episodeController = require("../controllers/episodeController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/").get(episodeController.getAllEpisodes);
router.route("/random").get(episodeController.getRandomEpisode);

router
  .route("/:id")
  .get(episodeController.getEpisode)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "contr"),
    episodeController.updateEpisode
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "contr"),
    episodeController.deleteEpisode
  );

module.exports = router;
