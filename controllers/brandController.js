const slugify = require('slugify');
const asyncHandler = require('express-async-handler')
const Brand = require('../models/brandModel');
const ApiError = require("../utils/apiError");


// @desc Create brand
// @route POST /api/brands
// @access private

const createBrand = asyncHandler(async (req, res) => {
    const {name, image} = req.body;
    const slug = slugify(name, {lower: true});
    const brand = await Brand.create({name, slug, image});
    res.status(201).json(brand);
});


// @desc Get all brands
// @route GET /api/brands?page=1&limit=5
// @access public

const getBrands = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;    

    const brands = await Brand.find().skip(skip).limit(limit);
    res.status(200).json({
        results: brands.length,
        page,
        brands: brands
    });
});


// @desc Get Specific Brand by id
// @route GET /api/brands/:id
// @access public

const getBrandById = asyncHandler(async (req, res, next) => {
   const {id} = req.params;
   const brand = await Brand.findById(id);
   if (!brand) {
     return next(new ApiError(`No brand for this id ${id}`, 404));
   } 
   res.status(200).json({ data: brand });
});

// @desc Update Specific Brand by id
// @route PUT /api/brands/:id
// @access private

const updateBrandById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {name, image} = req.body;
    const slug = slugify(name, {lower: true});
    const brand = await Brand.findByIdAndUpdate({_id: id}, {name, slug, image}, {new: true});
    if (!brand) {
       return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(200).json({ data: brand });
});


// @desc Delete Specific Brand by id
// @route DELETE /api/brands/:id
// @access private

const deleteBrandById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
       return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(200).json({ 
        data: "Brand deleted successfully"
    });
});

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById
}