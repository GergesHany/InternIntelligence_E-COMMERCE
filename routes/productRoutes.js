const express = require('express');

const router = express.Router();

const {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
} = require('../controllers/productController');

const {
    createProductValidator, 
    getProductValidator, 
    updateProductValidator, 
    deleteProductValidator,
} = require('../utils/validators/productValidator');


router.route('/')
    .post(createProductValidator, createProduct)
    .get(getProducts);

router.route('/:id')
    .get(getProductValidator, getProductById)
    .put(updateProductValidator, updateProductById)
    .delete(deleteProductValidator, deleteProductById);

module.exports = router;