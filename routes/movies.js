const express = require("express");
const router = express.Router();

const movies_controller = require("../controllers/moviesController");

router.get("/form", movies_controller.movie_form_get);
router.post("/form", movies_controller.movie_form_post);

router.get("/", movies_controller.movie_list);

module.exports = router;
