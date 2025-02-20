const express = require('express');

const router = express.Router();

const {
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById
} = require('../controllers/brandController');


router.route('/')
    .post(createBrand)
    .get(getBrands);

router.route('/:id')
    .get(getBrandById)
    .put(updateBrandById)
    .delete(deleteBrandById);

module.exports = router;