const express = require('express');
const {
  register,
  login,
  getMe,
  adminLogin,
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/adminLogin', authorize('admin'), adminLogin);
router.get('/getLoggedInUser', protect, getMe);
module.exports = router;
