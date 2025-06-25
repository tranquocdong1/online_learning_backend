const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { getProgressByUser, updateProgress } = require('../controllers/progressController');

router.get('/users/:userId/progress', authenticateToken, getProgressByUser);
router.put('/users/:userId/lessons/:lessonId/progress', authenticateToken, updateProgress);

module.exports = router;