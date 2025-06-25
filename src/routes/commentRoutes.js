const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { getCommentsByLesson, createComment, updateComment, deleteComment } = require('../controllers/commentController');

router.get('/lessons/:lessonId/comments', authenticateToken, getCommentsByLesson);
router.post('/lessons/:lessonId/comments', authenticateToken, createComment);
router.put('/lessons/:lessonId/comments/:commentId', authenticateToken, updateComment);
router.delete('/lessons/:lessonId/comments/:commentId', authenticateToken, deleteComment);

module.exports = router;