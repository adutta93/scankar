const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    resturant_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
      unique: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
    },
    options: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: 'Available',
      enum: ['Available', 'Unavailable'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
