const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userScheme = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'no Username']
    },
    email: {
        type: String,
        required: [true, 'no email'],
        unique: true,
        validate: [validator.isEmail, 'Not a valid email']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'no Password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'passwords do not match'],
        validate: {
            validator: function(el) {
                return el === this.password;
            }
        }
    },
    location: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: [true, 'No phone number']
    },
    gender: {
        type: String
    },
    positionUntilNow: {
        type: String
    },
    targetPosition: {
        type: String
    },
    yearExperience: {
        type: Number
    },
    linkdin: {
        type: String,
        validate: [validator.isURL, 'Not a valid URL']
    }

});

//encrypt pass in db
userScheme.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

//decrypt pass from db
userScheme.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userScheme);



module.exports = User;