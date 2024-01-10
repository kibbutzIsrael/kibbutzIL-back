const Volunteer = require("../models/volunteerModel");

const volunteerController = {
  // GET method to retrieve all volunteers
  async getAllVolunteers(req, res) {
    try {
      const volunteers = await Volunteer.find();
      res.status(200).json(volunteers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET method to retrieve a single volunteer by ID
  async getVolunteerById(req, res) {
    try {
      const volunteer = await Volunteer.findById(req.params.id);
      if (volunteer) {
        res.status(200).json(volunteer);
      } else {
        res.status(404).json({ message: "Volunteer not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST method to create a new volunteer
  async createVolunteer(req, res) {
    const volunteer = new Volunteer(req.body);

    try {
      const newVolunteer = await volunteer.save();
      res.status(201).json(newVolunteer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // PUT method to update an existing volunteer by ID
  async updateVolunteer(req, res) {
    try {
      const volunteer = await Volunteer.findById(req.params.id);
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }

      volunteer.fullName = req.body.fullName;
      volunteer.email = req.body.email;
      volunteer.location = req.body.location;
      volunteer.phoneNumber = req.body.phoneNumber;
      volunteer.gender = req.body.gender;
      volunteer.positionAntilNow = req.body.positionAntilNow;
      volunteer.fecerPosition = req.body.fecerPosition;
      volunteer.yearExperience = req.body.yearExperience;
      volunteer.PDF = req.body.PDF;

      const updatedVolunteer = await volunteer.save();
      res.status(200).json(updatedVolunteer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // DELETE method to remove a volunteer by ID
  async deleteVolunteer(req, res) {
    try {
      const result = await Volunteer.findByIdAndDelete(req.params.id);
      if (result) {
        res.status(200).json({ message: "Volunteer deleted successfully" });
      } else {
        res.status(404).json({ message: "Volunteer not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = volunteerController;
