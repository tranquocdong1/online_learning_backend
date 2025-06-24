const express = require("express");
const router = express.Router();
const {
  getChapters,
  getLessons,
  getLessonById,
} = require("../controllers/contentController");

// Không cần middleware bảo vệ => học viên không cần đăng nhập vẫn xem được

// 1. Lấy danh sách chương của một khóa học
router.get("/courses/:courseId/chapters", getChapters);

// 2. Lấy danh sách bài học trong một chương
router.get("/chapters/:chapterId/lessons", getLessons);

// 3. Lấy chi tiết 1 bài học (hiển thị video, mô tả, v.v.)
router.get("/lessons/:id", getLessonById);

module.exports = router;
