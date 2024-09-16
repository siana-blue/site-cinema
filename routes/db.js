const express = require("express");
const router = express.Router();

const db_controller = require("../controllers/dbController");

router.get("/:obj", db_controller.db_obj_get);
router.post("/:obj", db_controller.db_obj_store);

module.exports = router;
