const slugify = require('slugify');
const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler')

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

module.exports = {
    createCategory,
    getCategories
};