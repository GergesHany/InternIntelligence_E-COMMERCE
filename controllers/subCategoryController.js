const asyncHandler = require('express-async-handler')
const ApiError = require("../utils/apiError");
const SubCategory = require('../models/subCategoryModel');
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlersFactory');


const setCategoryIdToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
};

// @desc Create subcategory
// @route POST /api/subcategories
// @access private

const createSubCategory = factory.createOne(SubCategory);

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
const createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) filterObject = { category: req.params.categoryId };
    req.filterObj = filterObject;
    next();
};

// @desc Get all subcategories
// @route GET /api/subcategories?page=1&limit=5
// @access public

const getSubCategories = asyncHandler(async (req, res) => {
    const DocumentsCount = await SubCategory.countDocuments();
    const features = new APIFeatures(SubCategory.find(), req.query).filter().sort().limitFields().paginate(DocumentsCount);
    
    const {mongooseQuery, paginationResult} = features;
    const SubCategorys = await mongooseQuery.populate('category', 'name');

    res.status(200).json({
        success: true,
        pagination: paginationResult,
        count: SubCategorys.length,
        data: SubCategorys
    });
});


// @desc Get Specific Subcategory by id
// @route GET /api/subcategories/:id
// @access public

const getSubCategoryById = factory.getOne(SubCategory);


// @desc Update Specific Subcategory by id
// @route PUT /api/subcategories/:id
// @access private

const updateSubCategoryById = factory.updateOne(SubCategory);


// @desc Delete Specific Subcategory by id
// @route DELETE /api/subcategories/:id
// @access private

const deleteSubCategoryById = factory.deleteOne(SubCategory);

module.exports = {
    createSubCategory,
    getSubCategories,
    getSubCategoryById,
    updateSubCategoryById,
    deleteSubCategoryById,
    setCategoryIdToBody,
    createFilterObj
}

