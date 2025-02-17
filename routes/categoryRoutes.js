const express = require('express');
const router = express.Router();

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} = require('../controllers/categoryController');

const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
  } = require('../utils/validators/categoryValidator');


router.route('/').post(createCategoryValidator, createCategory).get(getCategories);
router.route('/:id')
                   .get(getCategoryValidator, getCategoryById)
                   .put(updateCategoryValidator, updateCategoryById)
                   .delete(deleteCategoryValidator, deleteCategoryById);



module.exports = router;
