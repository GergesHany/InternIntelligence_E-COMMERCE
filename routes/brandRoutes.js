const express = require('express');

const router = express.Router();

const {
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById,
    updateBrandImage,
    resizeImage
} = require('../controllers/brandController');


router.route('/')
    .post(updateBrandImage, resizeImage, createBrand)
    .get(getBrands);

router.route('/:id')
    .get(getBrandById)
    .delete(deleteBrandById)
    .put(updateBrandImage, resizeImage, updateBrandById);

module.exports = router;