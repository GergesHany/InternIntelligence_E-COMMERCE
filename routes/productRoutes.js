const express = require('express');

const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    uploadProductImages,
    resizeProductImages
} = require('../controllers/productController');

const {
    createProductValidator, 
    getProductValidator, 
    updateProductValidator, 
    deleteProductValidator,
} = require('../utils/validators/productValidator');


router.route('/')
    .get(getProducts)
    .post(uploadProductImages, resizeProductImages, createProductValidator, createProduct);


router.route('/:id')
    .get(getProductValidator, getProductById)
    .delete(deleteProductValidator, deleteProductById)
    .put(uploadProductImages, resizeProductImages, updateProductValidator, updateProductById);

module.exports = router;