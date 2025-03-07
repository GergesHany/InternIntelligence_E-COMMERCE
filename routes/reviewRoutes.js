const express = require('express');

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require('../utils/validators/reviewValidator');

const {
  createReview,
  getReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  createFilterObj,
  setProductIdAndUserIdToBody
} = require('../controllers/reviewController');

const {
  protect,
  allowedTo,
} = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(createFilterObj, getReviews)
router.route('/:id').get(getReviewValidator, getReviewById)

router.use(protect);  

router.route('/:id').put(allowedTo('user'), updateReviewValidator, updateReviewById)
  .delete(allowedTo('user', 'manager', 'admin'), deleteReviewValidator, deleteReviewById);

router.route('/').post(
  allowedTo('user'),
  setProductIdAndUserIdToBody,
  createReviewValidator,
  createReview
);


module.exports = router;