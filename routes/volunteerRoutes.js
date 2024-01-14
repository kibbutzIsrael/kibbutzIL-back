const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController'); 

// GET all volunteers
router.get('/', volunteerController.getAllVolunteers);

router.get('/:id', volunteerController.getVolunteerById);

// POST a new volunteer
router.post('/',volunteerController.uploadCV, volunteerController.createVolunteer);

// PUT (update) a volunteer by ID
router.put('/:id', volunteerController.updateVolunteer);

router.delete('/:id', volunteerController.deleteVolunteer);

module.exports = router;
