const express = require("express");
const { sendTestEmail } = require("../utils/emailSender");
require('dotenv').config();
const router = express.Router();

router.post("/send-test-email", (req, res) => {
  console.log("Mailtrap Username:", process.env.Mail_Trap_User_Name);
  console.log("Mailtrap Password:", process.env.Mail_Trap_User_Pwd);

  sendTestEmail();
  res.send("Test email is being sent");
});

module.exports = router;
