const express = require('express');

const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  updateCategoryImage,
  resizeImage
} = require('../controllers/categoryController');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');


const subCategories = require('./subCategoryRoutes');

router.use('/:categoryId/subcategories', subCategories);


router.route('/')
              .get(getCategories)
              .post(updateCategoryImage, resizeImage, createCategoryValidator, createCategory);


router.route('/:id')
                   .get(getCategoryValidator, getCategoryById)
                   .delete(deleteCategoryValidator, deleteCategoryById)
                   .put(updateCategoryImage, resizeImage, updateCategoryValidator, updateCategoryById);

module.exports = router;
