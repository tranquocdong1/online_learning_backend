const express = require('express');
const router = express.Router();
const { login, refreshToken } = require('../controllers/adminController');
const { getUsers, lockUser, deleteUser } = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middlewares/auth');

// Admin authentication
router.post('/login', login);
router.post('/refresh-token', refreshToken); // TODO: Add validation for refresh token

// Admin user management
router.get('/users', authenticateToken, isAdmin, getUsers);
router.patch('/users/:id/lock', authenticateToken, isAdmin, lockUser);
router.delete('/users/:id', authenticateToken, isAdmin, deleteUser);

module.exports = router;