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

const router = express.Router();

router.route('/').get(getAllProducts).post(cloudUpload, createProduct);
router
  .route('/:id')
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
