const mongoose = require('mongoose');
const validator = require('validator');

const volunteerFormSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'No name provided'] 
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
        required: [true, 'No phone number provided']
    },
    gender: String,
    positionUntilNow: String,
    fecerPosition: String, 
    yearExperience: String,
    CVfile: Buffer
});

const VolunteerForm = mongoose.model('VolunteerForm', volunteerFormSchema);

module.exports = VolunteerForm;
