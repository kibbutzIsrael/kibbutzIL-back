const VolunteerForm = require("../models/volunteerFormModel");
const multer = require("multer");
const { nextTick } = require("process");
//multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "volunteers-CV");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.email}-CV.pdf`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.originalname.split(".")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new AppError("Not a PDF file", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCV = upload.single("CVfile");

//controllers
// GET method to retrieve all volunteers
exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await VolunteerForm.find();
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET method to retrieve a single volunteer by ID
exports.getVolunteerById = async (req, res) => {
  try {
    const volunteer = await VolunteerForm.findById(req.params.id);
    if (volunteer) {
      res.status(200).json(volunteer);
    } else {
      res.status(404).json({ message: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST method to create a new volunteer
exports.createVolunteer = async (req, res) => {
  const checkVolunteer = await VolunteerForm.findOne({ email: req.body.email });

  if (checkVolunteer) {
    // If a volunteer with the given email already exists, return an error
    return res
      .status(400)
      .json({ message: "Volunteer with this email already exists" });
  }
  const volunteer = new VolunteerForm(req.body);

  try {
    const newVolunteer = await volunteer.save();
    res.status(201).json(newVolunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT method to update an existing volunteer by ID
exports.updateVolunteer = async (req, res) => {
  try {
    const volunteer = await VolunteerForm.findById(req.params.id);
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
    volunteer.CVfile = `${req.body.email}-CV.pdf`;

    const updatedVolunteer = await volunteer.save();
    res.status(200).json(updatedVolunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE method to remove a volunteer by ID
exports.deleteVolunteer = async (req, res) => {
  try {
    const result = await VolunteerForm.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: "Volunteer deleted successfully" });
    } else {
      res.status(404).json({ message: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET method to download volunteer CV file
exports.getVolunteerCVById = async (req, res) => {
  try {
    const volunteer = await VolunteerForm.findById(req.params.id);
    if (volunteer) {
      res.download(`volunteers-CV/${volunteer.email}-CV.pdf`, function (err) {
        if (err) {
          res.status(500).json({ message: err.message });
        }
      });
    } else {
      res.status(404).json({ message: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... (your imports and schema definition)

// ... (your imports and schema definition)

exports.getVolunteerFormByFilters = async (req, res) => {
  try {
    const { email, phoneNumber, positionUntilNow, sortOrder, yearExperience } =
      req.body;

    // Build the filter object based on provided parameters
    const filters = {};
    if (email) {
      filters.email = email;
    }
    if (phoneNumber) {
      filters.phoneNumber = phoneNumber;
    }
    if (positionUntilNow) {
      filters.positionUntilNow = positionUntilNow;
    }

    // Build the sort object based on sortOrder
    const sort = {};
    if (sortOrder === "Name-A-B") {
      sort.fullName = 1; // Sort by name, A to B
    } else if (sortOrder === "Name-B-A") {
      sort.fullName = -1; // Sort by name, B to A
    } else if (sortOrder === "Newest") {
      sort.createdAt = -1; // Sort by creation date, newest to oldest
    } else if (sortOrder === "yearExperience-1-9") {
      sort.yearExperience = 1;
    } else if (sortOrder === "yearExperience-9-1") {
      sort.yearExperience = -1;
    }

    const volunteers = await VolunteerForm.find(filters).sort(sort);

    res.status(200).json(volunteers);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
