const express = require("express");
const characterController = require("../controllers/characterController");
const router = express.Router();

router.route("/").get(characterController.getAllCharacters);
router.route("/random").get(characterController.getRandomCharacter);

module.exports = router;
