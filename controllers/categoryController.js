const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');


const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middleware/uploadImageMiddleware');

const updateCategoryImage = uploadSingleImage('image');

const resizeImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
       .resize(600, 600)
       .toFormat('jpeg')
       .jpeg({ quality: 90 })
       .toFile(`uploads/categories/${filename}`); 
    
    // save the image name to the request body
    req.body.image = filename;   

    next();
});

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
    deleteCategoryById,
    updateCategoryImage,
    resizeImage
};