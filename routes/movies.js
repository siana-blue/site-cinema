const express = require("express");
const router = express.Router();

const movies_controller = require("../controllers/moviesController");
const auth_controller = require("../controllers/authController");

router.get(
  "/new",
  auth_controller.middle_auth,
  movies_controller.movie_form_get
);
router.get(
  "/:id",
  auth_controller.middle_auth,
  movies_controller.movie_form_update
);
router.post(
  "/",
  auth_controller.middle_auth,
  movies_controller.movie_form_post
);

router.get("/", auth_controller.middle_auth, movies_controller.movie_list);

module.exports = router;
