const mongoose = require('mongoose');
const validator = require('validator'); 

const organizationFormSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: [true, "Organization name is required"],
    minlength: [2, "Organization name must be at least 2 characters long"],
  },
  organizationPhoneNumber: {
    type: String,
    required: [true, "Organization phone number is required"],
    validate: {
      validator: function (v) {
        return /^0\d{8,9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  organizationContactName: {
    type: String,
    required: [true, "Organization contact name is required"],
    minlength: [2, "Contact name must be at least 2 characters long"],
  },
  organizationEmail: {
    type: String,
    required: [true, "Organization email is required"],
    validate: [validator.isEmail, "Invalid email address"],
    lowercase: true,
  },
  organizationMessageBody: {
    type: String,
    required: [true, "Organization message body is required"],
    minlength: [10, "Message body must be at least 10 characters long"],
  },
  organizationType: {
    type: String,
  },
});

const OrganizationForm = mongoose.model(
  "OrganizationForm",
  organizationFormSchema
);

module.exports = OrganizationForm;
