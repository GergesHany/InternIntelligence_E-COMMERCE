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

const { 
    protect,
    allowedTo 
  } = require('../controllers/authController');

const reviewsRoutes = require('./reviewRoutes');

// [PORT, GET] product reviews
router.use('/:productId/reviews', reviewsRoutes);


router.route('/')
    .get(getProducts)
    .post(
        protect,
        allowedTo('admin', 'manager'),
        uploadProductImages, 
        resizeProductImages, 
        createProductValidator, 
        createProduct
    );


router.route('/:id')
    .get(getProductValidator, getProductById)
    .delete(
        protect,
        allowedTo('admin'),
        deleteProductValidator, 
        deleteProductById
    )
    .put(
        protect,
        allowedTo('admin', 'manager'),
        uploadProductImages, 
        resizeProductImages, 
        updateProductValidator, 
        updateProductById
    );

module.exports = router;