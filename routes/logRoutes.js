const express = require("express");
const { getLogs, deleteLogs } = require("../controllers/logController");

const router = express.Router()

router.get("/", getLogs)
router.delete("/", deleteLogs)

module.exports = router;