const Contact = require('../models/contactModel'); 

const contactController = {
    // GET method to retrieve all contacts
    async getAllContacts(req, res) {
        try {
            const contacts = await Contact.find();
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // GET method to retrieve a contact by ID
    async getContactById(req, res) {
        try {
            const contact = await Contact.findById(req.params.id);
            if (contact) {
                res.status(200).json(contact);
            } else {
                res.status(404).json({ message: "Contact not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // POST method to create a new contact
    async createContact(req, res) {
        const contact = new Contact({
            contactName: req.body.contactName,
            contactEmail: req.body.contactEmail,
            contactMessageBody: req.body.contactMessageBody
        });

        try {
            const newContact = await contact.save();
            res.status(201).json(newContact);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // PUT method to update a contact
    async updateContact(req, res) {
        try {
            const contact = await Contact.findById(req.params.id);
            if (!contact) {
                return res.status(404).json({ message: "Contact not found" });
            }

            contact.contactName = req.body.contactName;
            contact.contactEmail = req.body.contactEmail;
            contact.contactMessageBody = req.body.contactMessageBody;

            const updatedContact = await contact.save();
            res.status(200).json(updatedContact);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // DELETE method to delete an contact
    async deleteContact(req, res) {
        try {
            const contact = await Contact.findById(req.params.id);
            if (!contact) {
                return res.status(404).json({ message: "Contact not found" });
            }

            await contact.remove();
            res.status(200).json({ message: "Contact deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = contactController;
