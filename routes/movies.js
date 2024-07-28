const express = require("express");
const router = express.Router();

const movies_controller = require("../controllers/moviesController");

router.get("/", movies_controller.movie_form_get);
router.post("/", movies_controller.movie_preview);
router.post("/create", movies_controller.movie_db_store);

module.exports = router;
