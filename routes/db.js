const express = require("express");
const router = express.Router();

const db_controller = require("../controllers/dbController");

router.get("/tmdb", db_controller.get_tmdbID);
router.get("/info", db_controller.get_info);
router.get("/movies", db_controller.get_movies);

module.exports = router;
