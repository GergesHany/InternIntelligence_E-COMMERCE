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
const { 
  protect,
  allowedTo 
} = require('../controllers/authController');

router.use('/:categoryId/subcategories', subCategories);


router.route('/')
              .get(getCategories)
              .post(
                protect, 
                allowedTo('admin', 'manager'), 
                updateCategoryImage, 
                resizeImage, 
                createCategoryValidator, 
                createCategory
              );


router.route('/:id')
                   .get(getCategoryValidator, getCategoryById)
                   .delete(
                      protect, 
                      allowedTo('admin'), 
                      deleteCategoryValidator, 
                      deleteCategoryById
                   )
                   .put(
                      protect, 
                      allowedTo('admin', 'manager'), 
                      updateCategoryImage, 
                      resizeImage, 
                      updateCategoryValidator, 
                      updateCategoryById
                  );

module.exports = router;
