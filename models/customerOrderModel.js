const mongoose = require('mongoose');
const User = require('./userModels');
const ObjectId = mongoose.ObjectId;

const customerOrderSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    orders: [
      {
        item: String,
        quantity: Number,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    orderType: {
      type: String,
      default: 'Take Home',
      enum: ['Dine In', 'Take Home'],
      required: true,
    },
    address: String,
    palced_time: {
      type: Date,
      default: Date.now,
    },
    updated: Date,
    status: {
      type: String,
      default: 'Pending',
      enum: [
        'Pending',
        'Placed',
        'Recieved',
        'Processing',
        'Delivered',
        'Cancelled',
      ],
    },
    process: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Accepted', 'Delivered'],
    },
    noOfSeatsRequested: {
      type: Number,
    },
    user: {
      type: ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CustomerOrder', customerOrderSchema);
