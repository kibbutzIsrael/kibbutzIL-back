const express = require('express');
const router = express.Router();
const volunteerFormController = require('../controllers/volunteerFormController'); 
const authController = require('../controllers/authController');

// GET all volunteers
router.get('/',authController.protect ,volunteerFormController.getAllVolunteers);

router.get('/:id',authController.protect ,volunteerFormController.getVolunteerById);
//get volunteer cv file
router.get('/CV/:id',authController.protect ,volunteerFormController.getVolunteerCVById);
// POST a new volunteer
router.post('/', volunteerFormController.uploadCV, volunteerFormController.createVolunteer);

// PUT (update) a volunteer by ID
router.put('/:id',authController.protect, authController.resrictTo('admin'), volunteerFormController.updateVolunteer);

router.delete('/:id',authController.protect, authController.resrictTo('admin'), volunteerFormController.deleteVolunteer);

module.exports = router;
