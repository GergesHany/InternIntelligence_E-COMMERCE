const express = require('express');

// mergeParams: true is used to merge the params from the parent router
// in this case, the parent router is categoryRoutes.js

const router = express.Router({ mergeParams: true });

const { 
    createSubCategory, 
    getSubCategories, 
    getSubCategoryById, 
    updateSubCategoryById,
    deleteSubCategoryById,
    setCategoryIdToBody,
    createFilterObj
} = require('../controllers/subCategoryController');

const {
    createSubCategoryValidator, 
    getSubCategoryValidator, 
    updateSubCategoryValidator
} = require('../utils/validators/subCategoryValidator');

router.route('/')
    .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
    .get(createFilterObj, getSubCategories);

router.route('/:id')
    .get(getSubCategoryValidator, getSubCategoryById)
    .put(updateSubCategoryValidator, updateSubCategoryById)
    .delete(deleteSubCategoryById);

module.exports = router;