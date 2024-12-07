const express = require("express");
const router = express.Router();

const page_controller = require("../controllers/pageController");

router.get("/", page_controller.index_page);
router.get("/planning", page_controller.planning_page);

module.exports = router;
