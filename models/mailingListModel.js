const mongoose = require("mongoose");
const validator = require("validator");

const mailingListSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "No Email provided"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
  },
});

const MailingList = mongoose.model("MailingList", mailingListSchema);

module.exports = MailingList;
