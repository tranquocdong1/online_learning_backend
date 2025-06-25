const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { getLessonRating, createOrUpdateRating } = require('../controllers/ratingController');

router.get('/lessons/:lessonId/ratings', getLessonRating);
router.put('/lessons/:lessonId/ratings', authenticateToken, createOrUpdateRating);

module.exports = router;