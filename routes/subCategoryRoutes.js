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

const { 
    protect,
    allowedTo 
  } = require('../controllers/authController');

router.route('/')
    .post(
        protect,
        allowedTo('admin', 'manager'),
        setCategoryIdToBody, 
        createSubCategoryValidator, 
        createSubCategory
    )
    .get(createFilterObj, getSubCategories);

router.route('/:id')
    .get(getSubCategoryValidator, getSubCategoryById)
    .put(
        protect,
        allowedTo('admin', 'manager'),
        updateSubCategoryValidator, 
        updateSubCategoryById
    )
    .delete(
        protect,
        allowedTo('admin'),
        deleteSubCategoryById
    );

module.exports = router;