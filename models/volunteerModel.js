const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    location: String,
    phoneNumber: String,
    gender: String,
    positionUntilNow: String,
    fecerPosition: String, 
    yearExperience: String,
    PDF: String
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
