const bcrypt = require('bcrypt');

const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

const User = require('../models/userModel');
const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middleware/uploadImageMiddleware');

const createToken = require('../utils/createToken');

const updateUserImage = uploadSingleImage('profileImg');


const resizeImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
       .resize(600, 600)
       .toFormat('jpeg')
       .jpeg({ quality: 90 })
       .toFile(`uploads/user/${filename}`); 
    
    // save the image name to the request body
    req.body.image = filename;   

    next();
});

// @desc Create brand
// @route POST /api/users
// @access private

const createUser = factory.createOne(User);


// @desc Get all users
// @route GET /api/users?page=1&limit=5&sort=name&fields=name,email
// @access private

const getUsers = factory.getAll(User);


// @desc Get Specific User by id
// @route GET /api/users/:id
// @access private

const getUserById = factory.getOne(User);


// @desc Update Specific User by id
// @route PUT /api/users/:id
// @access private

const updateUserById = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc Update Specific user password
// @route PATCH /api/users/changePassword/:id
// @access private

const changeUserPassword = asyncHandler(async (req, res, next) => {
  const newPassword = await bcrypt.hash(req.body.password, 12);
  const document = await User.findByIdAndUpdate(
    req.params.id, {
      password: newPassword,
      confirmPassword: newPassword,
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});


// @desc Delete Specific User by id
// @route DELETE /api/users/:id
// @access private

const deleteUserById = factory.deleteOne(User);


// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect

const getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/Protect

const updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,{
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/updateMe
// @access  Private/Protect

const updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { 
      new: true 
    }
  );

  res.status(200).json({ data: updatedUser });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect

const deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({ status: 'Success' });
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
}