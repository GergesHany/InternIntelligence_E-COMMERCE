const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
     
      name: {
        type: String,
        require: [true, 'Category name is required'],
        unique: [true, 'Category name must be unique'],
        minlength: [3, 'Category name must be at least 3 characters long'],
        maxlength: [32, 'Category name must be less than 32 characters long'],
      },
      
      slug: {
        type: String,
        lowercase: true,
      },

      image: {
        type: String,
      },

    },
    {
        timestamps: true
    }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
