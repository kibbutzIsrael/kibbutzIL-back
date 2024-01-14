const express = require('express');
const router = express.Router();
const mailingListController = require('../controllers/mailingListController'); 

// GET all mails
router.get('/', mailingListController.getAllMails);

// GET a mail by ID
router.get('/:id', mailingListController.getMailById);

// POST a new mail
router.post('/', mailingListController.addMail);

// PUT (update) a mail by ID
router.put('/:id', mailingListController.updateMail);

// DELETE a mail by ID
router.delete('/:id', mailingListController.deleteMail);

module.exports = router;