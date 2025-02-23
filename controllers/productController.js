const slugify = require('slugify');
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel');
const ApiError = require("../utils/apiError");
const APIFeatures = require('../utils/apiFeatures');

// @desc Create Product
// @route POST /api/products
// @access private

const createProduct = asyncHandler(async (req, res) => {
    const {title, description, quantity, price, colors, imageCover, images, category, subCategory, brand} = req.body;
    const slug = slugify(title, {lower: true});
    const product = await Product.create({title, slug, description, quantity, price, colors, imageCover, images, category, subCategory, brand});
    res.status(201).json(product);
});


// @desc Get all products
// @route GET /api/products?page=1&limit=5&keyword=keyword&sort=createdAt&fields=title,price
// @access public

const getProducts = asyncHandler(async (req, res) => {
    const DocumentsCount = await Product.countDocuments();
    const features = new APIFeatures(Product.find(), req.query).search('Products').filter().sort().limitFields().paginate(DocumentsCount);
    
    const {mongooseQuery, paginationResult} = await features;
    const products = await mongooseQuery.populate('category', 'name').populate('subCategory', 'name').populate('brand', 'name');

    res.status(200).json({
        success: true,
        pagination: paginationResult,
        count: products.length,
        data: products
    });
});


// @desc Get specific product by id
// @route GET /api/products/:id
// @access public

const getProductById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('category', 'name').populate('subCategory', 'name').populate('brand', 'name');

    if (!product) {
        return next(new ApiError(`No product for this id ${id}`, 404));
    }

    res.status(200).json({ data: product });
});


// @desc Update Specific Product by id
// @route PUT /api/products/:id
// @access private

const updateProductById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

    if (!product) {
        return next(new ApiError(`No product for this id ${id}`, 404));
    }

    res.status(200).json({ data: product });
});


// @desc Delete Specific Product by id
// @route DELETE /api/products/:id
// @access private

const deleteProductById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return next(new ApiError(`No product for this id ${id}`, 404));
    }

    res.status(200).json({ 
        data: "Product deleted successfully"
    });
});


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
}