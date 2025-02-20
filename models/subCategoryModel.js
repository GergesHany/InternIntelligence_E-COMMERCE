const mongoose = require('mongoose')

const SubCategorySchema = new mongoose.Schema(
    {

        name: {
            type: String,
            trim: true,
            unique: [true, "SubCategory must be unique"],
            minlength: [2, "To short SubCategory name"],
            maxlength: [32, "To long SubCategory name"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, "SubCategory must belong to a Category"]
        },

    }, {
        timestamps: true
    }
)

const SubCategory = mongoose.model('SubCategory', SubCategorySchema)
module.exports = SubCategory;