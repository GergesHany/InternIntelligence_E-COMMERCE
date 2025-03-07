const express = require('express');

const {
    protect,
    allowedTo,
} = require('../controllers/authController');

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../controllers/addressesController');

const router = express.Router();

router.use(protect, allowedTo('user'));
router.route('/').post(addAddress).get(getLoggedUserAddresses);
router.delete('/:addressId', removeAddress);

module.exports = router;