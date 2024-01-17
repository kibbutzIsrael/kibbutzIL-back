const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


//sign JWT token
const signToken = id => {
    return token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
//sign JWT token and send it to client as cookie
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)),
        httpOnly: true
    }
    if( process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt',token, cookieOptions);
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

//signup new user and response JWT token signed for it as cookie
exports.signup = catchAsync( async (req, res, next) => {
    const newUser = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        positionUntilNow: req.body.positionUntilNow,
        targetPosition: req.body.targetPosition,
        yearExperience: req.body.yearExperience,
        linkdin: req.body.linkdin
    });
    createSendToken(newUser,201,res);
});

//user login
exports.login = catchAsync( async (req, res, next) =>{ 
    const {email, password} = req.body;

    if(!email || !password) {
       return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }
    createSendToken(user,201,res);
});

//check if admin is logged in for security in admin page
exports.checkLoginStatus = (req, res, next) =>{
    if(req.user.role === 'admin'){
    res.status(201).json({
        status: 'success'
    });
    }
};

//JWT verification for routes
exports.protect = catchAsync( async (req, res, next) => {
    let token
    if(req.headers.cookie && req.headers.cookie.startsWith('jwt=')){
        token = req.headers.cookie.substring(4);
    }
    else if(req.header.Authorization && req.headers.Authorization.startsWith('Bearer: ')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new AppError('please login to get access', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if(!decoded){
        return next(new AppError('JWT error', 401));
    }
    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
        return next(new AppError('user no longer exist', 401));
    }

    req.user = freshUser;
    next();
});

//resricts routes to admin user only
exports.resrictTo = (...roles) =>{
    return(req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('no premission', 403));
        }
        next();
    } 
};