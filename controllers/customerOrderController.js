const CustomerOrder = require('../models/customerOrderModel');
const order = require('./orderController');

// Controllers
// to get a all order
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find();
    res.status(200).json({
      status: 'Success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
// to get a single order
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid Order ID',
    });
  }
};

// to create an order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await CustomerOrder.create(req.body);
    console.log(newOrder);
    order.createOrder(newOrder);
    res.status(201).json({
      status: 'Success',
      message: 'Order successfully placed',
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      err,
    });
  }
};

// update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await CustomerOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      err,
    });
  }
};

// In future need to add
