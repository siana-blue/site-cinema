const express = require("express");
const router = express.Router();

const update_controller = require("../controllers/updateController");

router.get("/", update_controller.update_form_get);
router.post("/", update_controller.update_form_post);

module.exports = router;
