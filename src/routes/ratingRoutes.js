const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { getLessonRating, getLessonRatingsList, createOrUpdateRating } = require('../controllers/ratingController');

router.get('/lessons/:lessonId/ratings', getLessonRating);
router.get('/lessons/:lessonId/ratings/list', getLessonRatingsList); // Thêm route mới
router.put('/lessons/:lessonId/ratings', authenticateToken, createOrUpdateRating);

module.exports = router;