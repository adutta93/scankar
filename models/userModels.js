const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    // encry_password: {
    //     type: String,
    //     required: true
    // },
    // salt: String,
    role: {
      type: Number,
      default: 0,
      required: true,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
