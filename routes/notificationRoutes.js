const express = require("express");
const {
  emailController,
  smsController,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/email", emailController);
router.post("/sms", smsController);

module.exports = router;
