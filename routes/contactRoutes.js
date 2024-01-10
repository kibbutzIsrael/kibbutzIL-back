const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET all contacts
router.get('/', contactController.getAllContacts);

// GET a contact by ID
router.get('/:id', contactController.getContactById);

// POST a new contact
router.post('/', contactController.createContact);

// PUT (update) a contact by ID
router.put('/:id', contactController.updateContact);

// DELETE a contact by ID
router.delete('/:id', contactController.deleteContact);

module.exports = router;
