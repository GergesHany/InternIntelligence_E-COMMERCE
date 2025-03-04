const express = require('express');

const router = express.Router();

const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
  } = require('../utils/validators/brandValidator');

const {
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById,
    resizeImage,
    uploadBrandImage,
} = require('../controllers/brandController');

const { 
    protect,
    allowedTo 
  } = require('../controllers/authController');

router.route('/')
    .post(
          protect,
          allowedTo('admin', 'manager'),
          uploadBrandImage, 
          resizeImage, 
          createBrandValidator, 
          createBrand
        )
    .get(getBrands);

router.route('/:id')
    .get(getBrandValidator, getBrandById)
    .delete(
        protect,
        allowedTo('admin'),
        deleteBrandValidator, 
        deleteBrandById
    )
    .put(
         protect,
         allowedTo('admin', 'manager'),
         uploadBrandImage, 
         resizeImage, 
         updateBrandValidator, 
         updateBrandById
        );

module.exports = router;