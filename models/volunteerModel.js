const mongoose = require('mongoose');
const validator = require('validator');

const volunteerSchema = new mongoose.Schema({
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
    phoneNumber: String,
    gender: String,
    positionUntilNow: String,
    fecerPosition: String, 
    yearExperience: String,
    CVfile: Buffer
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
