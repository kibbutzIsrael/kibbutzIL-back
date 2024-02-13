const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signupByAdmin", authController.signupByAdmin);
router.route("/login").post(authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// router.post("/filters"),
//   get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.getUserByFilters);

module.exports = router;
