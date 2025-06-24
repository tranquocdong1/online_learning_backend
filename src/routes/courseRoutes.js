const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth'); // Tùy chọn authentication
const { getPublicCourses } = require('../controllers/courseController');

// Route công khai để lấy danh sách khóa học cho học viên
router.get('/courses', authenticateToken, getPublicCourses); // Có thể bỏ authenticateToken nếu muốn công khai

module.exports = router;