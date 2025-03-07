const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Protected/User

const addToWishlist = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { wishlist: req.body.productId }
    }, {
        new: true,
    })

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ 
        status: 'success',
        message: 'Product added to wishlist',
        data: user.wishlist,
    });
});

// @desc    Get logged user wishlist
// @route   GET /api/wishlist
// @access  Protected/User

const getLoggedUserWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
        status:'success',
        message: 'User wishlist',
        data: user.wishlist,
    });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Protected/User

const removeFromWishlist = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: req.params.productId },
        new: true,
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
        status: 'success',
        message: 'Product removed from wishlist',
    });
});


module.exports = {
    addToWishlist,
    getLoggedUserWishlist,
    removeFromWishlist
}


