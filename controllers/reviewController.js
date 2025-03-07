const Review = require('../models/reviewModel');
const factory = require('./handlersFactory');

// @desc Create review
// @route POST /api/reviews
// @access private

const createReview = factory.createOne(Review);


// @desc Get all reviews
// @route GET /api/reviews
// @access public

const getReviews = factory.getAll(Review);


// @desc Get Specific Review by id
// @route GET /api/reviews/:id
// @access public

const getReviewById = factory.getOne(Review);


// @desc Update Specific Review by id
// @route PUT /api/reviews/:id
// @access private/protected

const updateReviewById = factory.updateOne(Review);


// @desc Delete Specific Review by id
// @route DELETE /api/reviews/:id
// @access private/protected(user, admin, manager)

const deleteReviewById = factory.deleteOne(Review);

// Nested route
// GET /api/product/:categoryId/reviews
const createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.productId) filterObject = { product: req.params.productId };
    req.filterObj = filterObject;
    next();
};

const setProductIdAndUserIdToBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
};

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReviewById,
    deleteReviewById,
    createFilterObj,
    setProductIdAndUserIdToBody
}