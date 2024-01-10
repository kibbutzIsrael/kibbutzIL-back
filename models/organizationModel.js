const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        required: true
    },
    organizationPhoneNumber: {
        type: String,
        required: true
    },
    organizationContactName: {
        type: String,
        required: true
    },
    organizationEmail: {
        type: String,
        required: true
    },
    organizationMessageBody: {
        type: String,
        required: true
    },
    organizationType: {
        type: String,
        required: true
    }
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
