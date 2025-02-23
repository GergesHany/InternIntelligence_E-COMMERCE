const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const Brand = require('../../models/brandModel');

exports.getBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand ID format'),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check('name')
    .notEmpty().withMessage('Brand required')
    .isLength({ min: 3 }).withMessage('Too short Brand name')
    .isLength({ max: 32 }).withMessage('Too long Brand name')
    .trim() // Ensure no leading/trailing spaces
    .custom(async (val, { req }) => {
      const existingBrand = await Brand.findOne({ name: val });
      if (existingBrand) {
        throw new Error('Brand name must be unique');
      }
      req.body.slug = slugify(val, { lower: true, strict: true });
      return true;
    }),

  check('image')
    .optional()
    .isURL().withMessage('Invalid image URL'),

  validatorMiddleware,
];

exports.updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand ID format'),
  
  body('name')
    .optional()
    .isLength({ min: 3 }).withMessage('Too short Brand name')
    .isLength({ max: 32 }).withMessage('Too long Brand name')
    .trim()
    .custom(async (val, { req }) => {
      if (val) {
        const existingBrand = await Brand.findOne({ name: val });
        if (existingBrand && existingBrand._id.toString() !== req.params.id) {
          throw new Error('Brand name must be unique');
        }
        req.body.slug = slugify(val, { lower: true, strict: true });
      }
      return true;
    }),

  check('image')
    .optional()
    .isURL().withMessage('Invalid image URL'),

  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand ID format'),
  validatorMiddleware,
];
