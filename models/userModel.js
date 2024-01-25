const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userScheme = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'no first name provided'],
        minlength: 2
    },
    lastName: {
        type: String,
        required: [true, 'no last name provided'],
        minlength: 2
    },
    email: {
        type: String,
        required: [true, 'no email'],
        lowercase: true,
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
        required: [true, 'No phone number'],
        validate: {
            validator: function(v) {
              return /^0\d{8,9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          }
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
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

});

//encrypt pass in db
userScheme.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

//update passwordChangedAtt property before save if password is changed
userScheme.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew ){  
    return next();
    }

    this.passwordChangedAt = Date.now() - 5000;
    next();
});

//decrypt pass from db
userScheme.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

//validation function for JWT, checks if password was changed after token provided
userScheme.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
};

//creates reset password for forgot password function
userScheme.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetToken = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userScheme);



module.exports = User;