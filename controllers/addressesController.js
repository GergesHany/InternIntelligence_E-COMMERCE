const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Add address to user addresses list
// @route   POST /api/addresses
// @access  Protected/User

const addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id,{
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Address added successfully.',
    data: user.addresses,
  });
});

// @desc    Remove address from user addresses list
// @route   DELETE /api/addresses/:addressId
// @access  Protected/User

const removeAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id,{
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Address removed successfully.',
    data: user.addresses,
  });
});

// @desc    Get logged user addresses list
// @route   GET /api/addresses
// @access  Protected/User

const getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('addresses');
  res.status(200).json({
    status: 'success',
    results: user.addresses.length,
    data: user.addresses,
  });
});

module.exports = {
    addAddress,
    removeAddress,
    getLoggedUserAddresses,
}