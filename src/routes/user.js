const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  upload,
  changePassword,
} = require('../controllers/userController');
const { authenticateToken, isUser, isAdmin } = require('../middlewares/auth');
const { getUsers, lockUser, deleteUser } = require('../controllers/userController');

router.get('/users', authenticateToken, isAdmin, getUsers);
router.patch('/users/:id/lock', authenticateToken, isAdmin, lockUser);
router.delete('/users/:id', authenticateToken, isAdmin, deleteUser);

router.get('/profile', authenticateToken, isUser, getProfile);
router.put(
  '/profile',
  authenticateToken,
  isUser,
  upload.single('avatar'),
  updateProfile
);
router.put('/change-password', authenticateToken, isUser, changePassword);

module.exports = router;
