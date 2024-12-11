const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");

router.get("/", auth_controller.login_form);
router.get("/jwt", auth_controller.check_auth);

module.exports = router;
