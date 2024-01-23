const mongoose = require('mongoose');
const validator = require('validator');

const volunteerFormSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'No name provided'],
        minlength: 2
    },
    email: {
        type: String,
        required: [true, 'No Email provided'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid Email']
    },
    location: String,
    phoneNumber: {
        type: String,
        required: [true, 'No phone number provided'],
        validate: {
            validator: function(v) {
              return /^0\d{8,9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          }
    },
    gender: String,
    positionUntilNow: String,
    fecerPosition: String, 
    yearExperience: Number,
    CVfile: Buffer,
    linkedin: {
        type: String,
        validate: [validator.isURL, 'Not a valid URL']
    }
});

const VolunteerForm = mongoose.model('VolunteerForm', volunteerFormSchema);

module.exports = VolunteerForm;