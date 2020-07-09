const express = require('express');
const {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

router.route('/').get(getAllOrders).post(createOrder);

router.route('/:id').get(getSingleOrder).patch(updateOrderStatus);

module.exports = router;
