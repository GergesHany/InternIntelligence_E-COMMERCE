const express = require('express');
const router = express.Router();

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} = require('../controllers/categoryController');

router.route('/').post(createCategory).get(getCategories);
router.route('/:id').get(getCategoryById).put(updateCategoryById).delete(deleteCategoryById);

module.exports = router;
