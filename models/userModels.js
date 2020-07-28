const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 32,
      required: [true, 'Please add  firstname'],
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      required: [true, 'Please add lastname'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
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
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    // salt: String,
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'accounts'],
      required: true,
    },

    ownerType: {
      type: String,
      default: 'returantowner',
      enum: ['returantowner', 'hotelowner'],
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//hashing password with bcrypt
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//match entered password with stored password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', userSchema);
