const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const Brand = require('../models/brandModel');
const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middleware/uploadImageMiddleware');

const uploadBrandImage = uploadSingleImage('image');

const resizeImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
       .resize(600, 600)
       .toFormat('jpeg')
       .jpeg({ quality: 90 })
       .toFile(`uploads/brands/${filename}`); 
    
    // save the image name to the request body
    req.body.image = filename;   

    next();
});

// @desc Create brand
// @route POST /api/brands
// @access private

const createBrand = factory.createOne(Brand);


// @desc Get all brands
// @route GET /api/brands?page=1&limit=5&sort=name&fields=name,image
// @access public

const getBrands = factory.getAll(Brand);


// @desc Get Specific Brand by id
// @route GET /api/brands/:id
// @access public

const getBrandById = factory.getOne(Brand);


// @desc Update Specific Brand by id
// @route PUT /api/brands/:id
// @access private

const updateBrandById = factory.updateOne(Brand);


// @desc Delete Specific Brand by id
// @route DELETE /api/brands/:id
// @access private

const deleteBrandById = factory.deleteOne(Brand);

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById,
    resizeImage,
    uploadBrandImage,
}