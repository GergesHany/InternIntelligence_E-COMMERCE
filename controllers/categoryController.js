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
// @route GET /api/categories
// @access public 

const getCategories = asyncHandler(async (req, res) => {
    const Categories = await Category.find();
    res.status(200).json({
        results: Categories.length,
        categories: Categories
    });
});

module.exports = {
    createCategory,
    getCategories
};