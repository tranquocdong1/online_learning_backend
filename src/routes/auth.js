const express = require('express');
   const router = express.Router();
   const { register, login, forgotPassword, resetPassword, logout } = require('../controllers/authController');
   const { authenticateToken, isUser } = require('../middlewares/auth');

   router.post('/register', register);
   router.post('/login', login);
   router.post('/forgot-password', forgotPassword);
   router.post('/reset-password', resetPassword);
   router.post('/logout', authenticateToken, isUser, logout);

   module.exports = router;