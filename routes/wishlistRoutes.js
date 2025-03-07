const express = require('express');

const {
    protect,
    allowedTo,
} = require('../controllers/authController');

const {
    addToWishlist,
    getLoggedUserWishlist,
    removeFromWishlist
} = require('../controllers/wishlistController');

const router = express.Router();

router.use(protect, allowedTo('user'));

router.route('/').post(addToWishlist).get(getLoggedUserWishlist);

router.delete('/:productId', removeFromWishlist);

module.exports = router;