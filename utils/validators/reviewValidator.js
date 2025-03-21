const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const Review = require('../../models/reviewModel');
const Product = require('../../models/productModel');

exports.createReviewValidator = [
  check('title').optional(),
  check('ratings')
    .notEmpty()
    .withMessage('ratings value required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Ratings value must be between 1 to 5'),
  check('user').isMongoId().withMessage('Invalid Review id format'),
  check('product')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val) => Product.findById(val).then((product) => {
      if (!product) {
        return Promise.reject(new Error(`No product found for ID: ${val}`));
      }
    }))
    .custom((val, { req }) => Review.findOne({ user: req.user._id, product: req.body.product }).then((review) => {
          if (review) {
            return Promise.reject(new Error('You already created a review before'));
          }
        }
      )
    ),
  validatorMiddleware,
];

exports.getReviewValidator = [
  check('id').isMongoId().withMessage('Invalid Review id format'),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) =>
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(new Error(`Your are not allowed to perform this action`));
        }
      })
    ),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) => {
      if (req.user.role === 'user') {
        return Review.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(new Error(`There is no review with id ${val}`));
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(new Error(`Your are not allowed to perform this action`));
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];