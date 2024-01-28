const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const authController = require('../controllers/authController');

// Route to add a new organization
router.post('/', organizationController.addNew);

// Route to edit an existing organization
router.put('/:id', authController.protect, authController.resrictTo('admin'), organizationController.edit);

// Route to remove an organization
router.delete('/:id', authController.protect, authController.resrictTo('admin'), organizationController.remove);

// Route to get all organizations
router.get('/',authController.protect ,organizationController.getAll);

// Route to get an organization by ID
router.get('/:id',authController.protect ,organizationController.getById);

module.exports = router;
