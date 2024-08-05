const express = require("express");
const router = express.Router();

const movies_controller = require("../controllers/moviesController");

router.get("/form", movies_controller.movie_form_get);
router.post("/form", movies_controller.movie_preview);
router.post("/create", movies_controller.movie_db_store);
router.get("/db", movies_controller.movie_db_get);
router.get("/", movies_controller.movie_list);

module.exports = router;
