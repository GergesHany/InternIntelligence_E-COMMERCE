const Product = require('../models/productModel');
const factory = require('./handlersFactory');


// @desc Create Product
// @route POST /api/products
// @access private

const createProduct = factory.createOne(Product);


// @desc Get all products
// @route GET /api/products?page=1&limit=5&keyword=keyword&sort=createdAt&fields=title,price
// @access public

const getProducts = factory.getAll(Product, 'Products');


// @desc Get specific product by id
// @route GET /api/products/:id
// @access public

const getProductById = factory.getOne(Product);


// @desc Update Specific Product by id
// @route PUT /api/products/:id
// @access private

const updateProductById = factory.updateOne(Product);


// @desc Delete Specific Product by id
// @route DELETE /api/products/:id
// @access private

const deleteProductById = factory.deleteOne(Product);

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
}