const express = require("express");
const { sendEmail } = require("../utils/emailSender");
require('dotenv').config();
const router = express.Router();

router.post("/send-test-email", (req, res) => {

  sendEmail('rotemh123@gmail.com', 'hi', 'test');
  res.send("Test email is being sent");
});

module.exports = router;
