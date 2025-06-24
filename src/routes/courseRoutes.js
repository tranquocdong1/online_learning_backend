const express = require('express');
const router = express.Router();
const { getPublicCourses } = require('../controllers/courseController');

// 🔓 Route công khai cho học viên – KHÔNG cần token
router.get('/public-courses', getPublicCourses);

module.exports = router;
