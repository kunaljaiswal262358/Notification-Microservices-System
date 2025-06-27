const express = require("express");
const {
  emailController,
  smsController,
  pushController,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/email", emailController);
router.post("/sms", smsController);
router.post("/push", pushController);

module.exports = router;
