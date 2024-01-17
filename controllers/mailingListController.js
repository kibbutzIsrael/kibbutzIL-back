const MailingList = require("../models/mailingListModel");

const mailingListController = {

    // GET method to retrieve all the mails
  async getAllMails(req, res) {
    console.log("all mails");
    try {
      const mails = await MailingList.find();
      res.status(200).json(mails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

    // GET method to retrieve all the mails as a list
    async getListMails(req, res) {
      console.log("all mails");
      try {
        const mails = await MailingList.find();
        res.status(200).json(mails.map(email => email.email));
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

  // GET method to retrieve a mail by ID
  async getMailById(req, res) {
    try {
      const mail = await MailingList.findById(req.params.id);
      if (mail) {
        res.status(200).json(mail);
      } else {
        res.status(404).json({ message: "Mail not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST method to add new mail to the mailing list
  async addMail(req, res) {
    const mail = new MailingList({
      email: req.body.ListEmail
    });

    try {
      const newMail = await mail.save();
      res.status(201).json(newMail);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // PUT method to update an organization's mail
  async updateMail(req, res) {
    const id = req.params.id;

    try {
      const mail = await MailingList.findById(id);
      if (!mail) {
        return res.status(404).json({ message: "Mail not found" });
      }

      // Update the organization fields
      Object.assign(mail, req.body);
      const updatedMail = await mail.save();
      res.status(200).json(updatedMail);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // DELETE method to delete an organization
  async deleteMail(req, res) {
    try {
      const result = await MailingList.findByIdAndDelete(req.params.id);

      if (result) {
        res.status(200).json({ message: "Organization deleted successfully" });
      } else {
        res.status(404).json({ message: "Organization not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports= mailingListController;