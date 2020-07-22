const express = require('express');
const cloudUpload = require('../utils/multer');
// const authenticateToken = require('../utils/jwt');
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(protect, authorize('admin'), cloudUpload, createProduct);
router
  .route('/:id')
  .get(getSingleProduct)
  .patch(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
