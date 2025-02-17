const slugify = require('slugify');
const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler')
const ApiError = require("../utils/apiError.js");

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
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;    

    const Categories = await Category.find().skip(skip).limit(limit);
    res.status(200).json({
        results: Categories.length,
        page,
        categories: Categories
    });
});


// @desc Get Specific Category by id
// @route GET /api/categories/:id
// @access public 

const getCategoryById = asyncHandler(async (req, res, next) => {
   const id = req.params.id;
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
    const id = req.params.id;
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

const deleteCategoryById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
       return next(new ApiError(`No category for this id ${id}`, 404));
    }
    res.status(200).json({ data: category });
});

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};