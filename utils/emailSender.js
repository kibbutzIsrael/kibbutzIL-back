// /path/to/emailSender.js
const cron = require("node-cron");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Nodemailer setup for Mailtrap
var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Gmail_User,
    pass: process.env.Gmail_Password,
  },
});

// Function to setup email scheduler
function setupEmailScheduler() {
  cron.schedule("0 9 * * 0", () => {
    // Every Sunday at 9 AM
    const mailOptions = {
      from: "your.email@example.com",
      to: "recipient@example.com",
      subject: "Weekly Sunday Email",
      text: "This is your weekly Sunday email.",
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending weekly email:", error);
      } else {
        console.log("Weekly email sent:", info.response);
      }
    });
  });
}

// Function to send a test email
function sendEmail(toMail, subject, mailBody) {
  const mailOptions = {
    from: process.env.Domain_Email,
    to: toMail,
    subject: subject,
    text: mailBody,
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending test email:", error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = { setupEmailScheduler, sendEmail };
