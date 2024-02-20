const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

//delete user
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

//unneeded routes
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // Update the organization fields
    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);

    if (result) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByFilters = async (req, res) => {
  try {
    let query = {};

    // If there is a query for email, phoneNumber, or firstName
    if (req.query.email) {
      query.email = req.query.email;
    }
    if (req.query.phoneNumber) {
      query.phoneNumber = req.query.phoneNumber;
    }
    if (req.query.firstName) {
      query.firstName = req.query.firstName;
    }

    let sortQuery = {};

    // Sorting logic based on sortBy and sortOrder
    if (req.query.sortBy) {
      if (req.query.sortOrder === "asc") {
        sortQuery[req.query.sortBy] = 1;
      } else if (req.query.sortOrder === "desc") {
        sortQuery[req.query.sortBy] = -1;
      }
    } else {
      // Default sorting by createdAt if no sorting query provided
      sortQuery.createdAt = 1;
    }

    const users = await User.find(query).sort(sortQuery);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
