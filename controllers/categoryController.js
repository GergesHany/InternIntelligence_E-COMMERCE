const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel');
const ApiError = require("../utils/apiError");
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlersFactory');


// @desc Create category
// @route POST /api/categories
// @access private 

const createCategory = factory.createOne(Category);

// @desc Get all categories
// @route GET /api/categories?page=1&limit=5
// @access public 

const getCategories = asyncHandler(async (req, res) => {
    const DocumentsCount = await Category.countDocuments();
    const features = new APIFeatures(Category.find(), req.query).filter().sort().limitFields().paginate(DocumentsCount);
    
    const {mongooseQuery, paginationResult} = features;
    const categorys = await mongooseQuery;

    res.status(200).json({
        success: true,
        pagination: paginationResult,
        count: categorys.length,
        data: categorys
    });

});


// @desc Get Specific Category by id
// @route GET /api/categories/:id
// @access public 

const getCategoryById = factory.getOne(Category);


// @desc Update Specific Category by id
// @route PUT /api/categories/:id
// @access private 

const updateCategoryById = factory.updateOne(Category);

// @desc Delete Specific Category by id
// @route DELETE /api/categories/:id
// @access private 

const deleteCategoryById = factory.deleteOne(Category);

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};