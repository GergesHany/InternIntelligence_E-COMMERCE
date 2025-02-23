const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Product title is required'],
            trim: true,
            minlength: [3, 'Product title must be at least 3 characters long'],
            maxlength: [100, 'Product title must be less than 100 characters long'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
            minlength: [20, 'Product description must be at least 10 characters long'],
            maxlength: [500, 'Product description must be less than 500 characters long'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
        },
        sold: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            trim: true,
            min: [0, 'Product price must be greater than or equal to 0'],
            max: [10000, 'Product price must be less than or equal to 10000'],
        },
        priceAfterDiscount: {
            type: Number,
        },
        colors: [String],
        imageCover: {
            type: String,
            required: [true, 'Product cover image is required'],
        },
        images: [String],
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'Product category is required'],
        },
        subCategory: [{
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory',
        }],
        brand: {
            type: mongoose.Schema.ObjectId,
            ref: 'Brand',
        },
        ratingsAverage: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating must be at most 5'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true
    }
);    

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 