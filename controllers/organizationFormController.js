const OrganizationForm = require("../models/organizationFormModel");

const organizationController = {
  // GET method to retrieve all organizations
  async getAllOrganizations(req, res) {
    try {
      const organizations = await OrganizationForm.find();
      res.status(200).json(organizations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET method to retrieve an organization by ID
  async getOrganizationById(req, res) {
    try {
      const organization = await OrganizationForm.findById(req.params.id);
      if (organization) {
        res.status(200).json(organization);
      } else {
        res.status(404).json({ message: "Organization not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST method to create a new organization
  async createOrganization(req, res) {
    const organization = new OrganizationForm(req.body);

    try {
      const newOrganization = await organization.save();
      res.status(201).json(newOrganization);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // PUT method to update an organization
  async updateOrganization(req, res) {
    const id = req.params.id;

    try {
      const organization = await OrganizationForm.findById(id);
      if (!organization) {
        return res.status(404).json({ message: "Organization not found" });
      }

      // Update the organization fields
      Object.assign(organization, req.body);
      const updatedOrganization = await organization.save();
      res.status(200).json(updatedOrganization);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // DELETE method to delete an organization
  async deleteOrganization(req, res) {
    try {
      const result = await OrganizationForm.findByIdAndDelete(req.params.id);

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

module.exports = organizationController;
