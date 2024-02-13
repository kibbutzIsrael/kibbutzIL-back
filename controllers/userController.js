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
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
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
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.getUserByFilters = async (req, res) => {
  // console.log("dd");
  // try {
  //   const {
  //     minPrice,
  //     maxPrice,
  //     ttcategory,
  //     category,
  //     size,
  //     color,
  //     sortOrder,
  //   } = req.body;
  //   const minPriceNumber = parseInt(minPrice, 10) || 0;
  //   const maxPriceNumber = parseInt(maxPrice, 10) || 0;
  //   console.log("dd", minPriceNumber);
  //   console.log("dd", minPriceNumber);
  //   // Build the filter object based on provided parameters
  //   const filters = {};
  //   if (minPriceNumber && maxPriceNumber) {
  //     filters.price = { $gte: minPrice, $lte: maxPrice };
  //   }
  //   if (ttcategory && Array.isArray(ttcategory) && ttcategory.length > 0) {
  //     filters.ttcategory = { $in: ttcategory };
  //   }
  //   if (category) {
  //     filters.category = category;
  //   }
  //   if (size) {
  //     filters.size = size;
  //   }
  //   if (color) {
  //     filters.color = color;
  //   }
  //   // Build the sort object based on sortOrder
  //   const sort = {};
  //   if (sortOrder === "Price-low-hight") {
  //     sort.price = 1; // Sort by price, low to high
  //   } else if (sortOrder === "Price-hight-low") {
  //     sort.price = -1; // Sort by price, high to low
  //   } else if (sortOrder === "Newest") {
  //     sort.createdAt = -1; // Sort by creation date, newest to oldest
  //   }
  //   const products = await Product.find(filters).sort(sort);
  //   res.json(products);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Server error" });
  // }
};
