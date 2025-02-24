const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const { uploadMixOfImages } = require('../middleware/uploadImageMiddleware');

const Product = require('../models/productModel');
const factory = require('./handlersFactory');

const uploadProductImages = uploadMixOfImages([
    {
      name: 'imageCover',
      maxCount: 1,
    },
    {
      name: 'images',
      maxCount: 8,
    },
]);
  
const resizeProductImages = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
      const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
  
      await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/products/${imageCoverFileName}`);
  
      req.body.imageCover = imageCoverFileName;
    }

    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (img, index) => {
          const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
  
          await sharp(img.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/products/${imageName}`);
  
          req.body.images.push(imageName);
        })
      );
  
      next();
    }
});


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
    uploadProductImages,
    resizeProductImages
}