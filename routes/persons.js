const express = require("express");
const router = express.Router();

const persons_controller = require("../controllers/personController");

router.post("/create", persons_controller.person_db_store);

module.exports = router;
