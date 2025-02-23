const Category = require('../models/categoryModel');
const factory = require('./handlersFactory');


// @desc Create category
// @route POST /api/categories
// @access private 

const createCategory = factory.createOne(Category);

// @desc Get all categories
// @route GET /api/categories?page=1&limit=5
// @access public 

const getCategories = factory.getAll(Category);


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