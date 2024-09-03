const express = require("express");
const router = express.Router();

const genres_controller = require("../controllers/genreController");

router.get("/db", genres_controller.genre_db_get);
router.post("/create", genres_controller.genre_db_store);

module.exports = router;
