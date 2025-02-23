const asyncHandler = require('express-async-handler')
const Brand = require('../models/brandModel');
const ApiError = require("../utils/apiError");
const APIFeatures = require('../utils/apiFeatures');
const factory = require('./handlersFactory');


// @desc Create brand
// @route POST /api/brands
// @access private

const createBrand = factory.createOne(Brand);


// @desc Get all brands
// @route GET /api/brands?page=1&limit=5&sort=name&fields=name,image
// @access public

const getBrands = asyncHandler(async (req, res) => {
    // build query
    const DocumentsCount = await Brand.countDocuments();
    const features = new APIFeatures(Brand.find(), req.query).filter().sort().limitFields().paginate(DocumentsCount);
    
    // execute query
    const {mongooseQuery, paginationResult} = features;
    const brands = await mongooseQuery;

    res.status(200).json({
        success: true,
        pagination: paginationResult,
        count: brands.length,
        data: brands
    });
});


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
    deleteBrandById
}