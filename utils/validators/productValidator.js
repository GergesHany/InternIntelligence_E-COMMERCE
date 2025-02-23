const slugify = require('slugify');
const { check, body } = require('express-validator');
const mongoose = require('mongoose');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const Category = require('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID format'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID format'),
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID format'),
  validatorMiddleware,
];

exports.createProductValidator = [
  check('title')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .notEmpty()
    .withMessage('Product title is required')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 20, max: 500 })
    .withMessage('Description must be between 20 and 500 characters'),
  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Quantity must be a number'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Sold must be a number'),
  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Price must be between 0 and 10000'),
  check('priceAfterDiscount')
    .optional()
    .isFloat()
    .withMessage('Price after discount must be a number')
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('Price after discount must be lower than original price');
      }
      return true;
    }),
  check('colors')
    .optional()
    .isArray()
    .withMessage('Colors must be an array of strings'),
  check('imageCover')
    .notEmpty()
    .withMessage('Product image cover is required'),
  check('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array of strings'),
  check('category')
    .notEmpty()
    .withMessage('Product category is required')
    .isMongoId()
    .withMessage('Invalid category ID format')
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new Error(`No category found for ID: ${categoryId}`));
        }
      })
    ),
  check('subCategory')
    .optional()
    .isArray()
    .withMessage('Subcategories must be an array of IDs')
    .custom((subCategoryIds) => {
      if (!subCategoryIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
        throw new Error('Invalid subCategory ID format');
      }
      return true;
    })
    .custom((subCategoryIds) =>
      SubCategory.find({ _id: { $in: subCategoryIds } }).then((result) => {
        if (result.length !== subCategoryIds.length) {
          return Promise.reject(new Error('Invalid subCategory IDs found'));
        }
      })
    )
    .custom((subCategoryIds, { req }) =>
      SubCategory.find({ category: req.body.category }).then((subCategories) => {
        const validSubCategoryIds = subCategories.map(sub => sub._id.toString());
        const allValid = subCategoryIds.every(id => validSubCategoryIds.includes(id));
        if (!allValid) {
          return Promise.reject(new Error('Subcategories do not belong to the specified category'));
        }
      })
    ),
  check('brand')
    .optional()
    .isMongoId()
    .withMessage('Invalid brand ID format'),
  check('ratingsAverage')
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('Rating quantity must be a number'),
  validatorMiddleware,
];