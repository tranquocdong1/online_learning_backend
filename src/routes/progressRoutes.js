const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const {
  getProgressByUser,
  updateProgress,
  getCourseProgress, // Thêm endpoint mới
} = require("../controllers/progressController");
const {
  createNote,
  getNotesByUser,
} = require("../controllers/noteController");

router.get("/users/:userId/progress", authenticateToken, getProgressByUser);
router.put("/users/:userId/lessons/:lessonId/progress", authenticateToken, updateProgress);
router.get("/courses/:courseId/progress", getCourseProgress); // Thêm route mới
router.post("/notes", authenticateToken, createNote); // Route tạo ghi chú
router.get('/users/notes', authenticateToken, getNotesByUser); // Loại bỏ :userId

module.exports = router;