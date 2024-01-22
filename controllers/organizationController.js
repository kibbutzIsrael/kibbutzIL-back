const Organization = require("../models/organizationModel");

// Add a new organization
exports.addNew = async (req, res) => {
  try {
    const newOrganization = new Organization(req.body);
    const savedOrganization = await newOrganization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit an existing organization
exports.edit = async (req, res) => {
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrganization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove an organization
exports.remove = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json({ message: 'Organization removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all organizations
exports.getAll = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an organization by ID
exports.getById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
