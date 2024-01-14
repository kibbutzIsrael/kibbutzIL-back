const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController'); 
const authController = require('../controllers/authController');

// GET all volunteers
router.get('/', volunteerController.getAllVolunteers);

router.get('/:id', volunteerController.getVolunteerById);
//get volunteer cv file
router.get('/CV/:id', volunteerController.getVolunteerCVById);
// POST a new volunteer
router.post('/', volunteerController.uploadCV, volunteerController.createVolunteer);

// PUT (update) a volunteer by ID
router.put('/:id',authController.protect, authController.resrictTo('admin'), volunteerController.updateVolunteer);

router.delete('/:id',authController.protect, authController.resrictTo('admin'), volunteerController.deleteVolunteer);

module.exports = router;
