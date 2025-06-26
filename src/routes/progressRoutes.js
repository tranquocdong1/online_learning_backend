const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const {
  getProgressByUser,
  updateProgress,
  getCourseProgress, // Thêm endpoint mới
} = require("../controllers/progressController");

router.get("/users/:userId/progress", authenticateToken, getProgressByUser);
router.put("/users/:userId/lessons/:lessonId/progress", authenticateToken, updateProgress);
router.get("/courses/:courseId/progress", getCourseProgress); // Thêm route mới

module.exports = router;