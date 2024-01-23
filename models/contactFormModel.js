const mongoose = require('mongoose');
const validator = require('validator');

const contactFormSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true,
        minlength: 2
    },
    contactEmail: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Not a valid Email address']
    },
    contactMessageBody: {
        type: String,
        required: true,
        minlength: 2
    }
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = ContactForm;
