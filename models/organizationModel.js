const mongoose = require('mongoose');
const validator = require('validator'); 

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
    minlength: 2
  },
  organizationPhoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^0\d{8,9}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  organizationContactName: {
    type: String,
    required: true,
    minlength: 2
  },
  organizationEmail: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  organizationMessageBody: {
    type: String,
    required: true,
    minlength: 10
  },
  organizationType: String
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
