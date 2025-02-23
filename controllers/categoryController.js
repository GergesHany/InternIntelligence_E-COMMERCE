const slugify = require('slugify');
const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel');
const ApiError = require("../utils/apiError");
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlersFactory');


// @desc Create category
// @route POST /api/categories
// @access private 

const createCategory = asyncHandler(async (req, res) => {
    const {name, image} = req.body;
    const slug = slugify(name, {lower: true});
    const category = await Category.create({name, slug, image});
    res.status(201).json(category);
});

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

const getCategoryById = asyncHandler(async (req, res, next) => {
   const {id} = req.params;
   const category = await Category.findById(id);
   if (!category) {
     return next(new ApiError(`No category for this id ${id}`, 404));
   } 
   res.status(200).json({ data: category });
});

// @desc Update Specific Category by id
// @route PUT /api/categories/:id
// @access private 

const updateCategoryById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {name, image} = req.body;
    const slug = slugify(name, {lower: true});
    const category = await Category.findByIdAndUpdate({_id: id}, {name, slug, image}, {new: true});
    if (!category) {
       return next(new ApiError(`No category for this id ${id}`, 404));
    }
    res.status(200).json({ data: category });
});

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