const express = require("express");
const router = express.Router();

const info_controller = require("../controllers/infoController");

router.get("/:obj", info_controller.info_get);
router.post("/:obj/render", info_controller.info_render);

module.exports = router;
