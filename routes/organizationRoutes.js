const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController'); 

// GET all organizations
router.get('/', organizationController.getAllOrganizations);

// GET an organization by ID
router.get('/:id', organizationController.getOrganizationById);

// POST a new organization
router.post('/', organizationController.createOrganization);

// PUT (update) an organization by ID
router.put('/:id', organizationController.updateOrganization);

// DELETE an organization by ID
router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;
