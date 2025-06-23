const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  upload,
  changePassword,
} = require('../controllers/userController');
const { authenticateToken, isUser } = require('../middlewares/auth');

// User profile routes - chỉ dành cho user
router.get('/profile', authenticateToken, isUser, getProfile);
router.put('/profile', authenticateToken, isUser, upload.single('avatar'), updateProfile);
router.put('/change-password', authenticateToken, isUser, changePassword);

module.exports = router;