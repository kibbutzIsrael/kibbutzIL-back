const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signupByAdmin',authController.protect ,authController.signupByAdmin);
router.route('/login').post(authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.route('/').get(authController.protect, userController.getAllUsers).post(userController.createUser);

router.route('/:id').get(authController.protect, userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;