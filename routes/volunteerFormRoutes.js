const express = require("express");
const router = express.Router();
const volunteerFormController = require("../controllers/volunteerFormController");
const authController = require("../controllers/authController");

// GET all volunteers
router.get("/", volunteerFormController.getAllVolunteers);

router.get("/:id", volunteerFormController.getVolunteerById);
//get volunteer cv file
router.get("/CV/:id", volunteerFormController.getVolunteerCVById);
// POST a new volunteer
router.post(
  "/",
  volunteerFormController.uploadCV,
  volunteerFormController.createVolunteer
);

// PUT (update) a volunteer by ID
router.put(
  "/:id",
  authController.protect,
  authController.resrictTo("admin"),
  volunteerFormController.updateVolunteer
);

router.delete(
  "/:id",
  authController.protect,
  authController.resrictTo("admin"),
  volunteerFormController.deleteVolunteer
);

router.post(
  "/filters",
  //   authController.protect,
  //   authController.resrictTo("admin"),
  volunteerFormController.getVolunteerFormByFilters
);

module.exports = router;
