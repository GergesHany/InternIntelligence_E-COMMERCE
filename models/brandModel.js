const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, 'Brand must be unique'],
      minlength: [3, 'Too short Brand name'],
      maxlength: [32, 'Too long Brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { 
    timestamps: true 
  }
);

const setImageURL = (doc) => {
  if (doc.image) {
    // prepend the base URL with the image path
    doc.image = `${process.env.BASE_URL}/brands/${doc.image}`;
  }
};

brandSchema.post('init', (doc) => {
  setImageURL(doc);
});

brandSchema.post('save', (doc) => {
  setImageURL(doc);
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;