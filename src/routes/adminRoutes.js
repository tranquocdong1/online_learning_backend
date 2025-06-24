const express = require("express");
const router = express.Router();
const { login, refreshToken } = require("../controllers/adminController");
const {
  getUsers,
  lockUser,
  deleteUser,
} = require("../controllers/userController");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/contentController");
const { authenticateToken, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

// Admin authentication
router.post("/login", login);
router.post("/refresh-token", refreshToken);

// Admin user management
router.get("/users", authenticateToken, isAdmin, getUsers);
router.patch("/users/:id/lock", authenticateToken, isAdmin, lockUser);
router.delete("/users/:id", authenticateToken, isAdmin, deleteUser);

// Admin category management
router.get("/categories", authenticateToken, isAdmin, getCategories);
router.post("/categories", authenticateToken, isAdmin, createCategory);
router.put("/categories/:id", authenticateToken, isAdmin, updateCategory);
router.delete("/categories/:id", authenticateToken, isAdmin, deleteCategory);

// Admin course management
router.get("/courses", authenticateToken, isAdmin, getCourses);
router.post(
  "/courses",
  authenticateToken,
  isAdmin,
  upload.single("thumbnail"),
  createCourse
);
router.put(
  "/courses/:id",
  authenticateToken,
  isAdmin,
  upload.single("thumbnail"),
  updateCourse
);
router.delete("/courses/:id", authenticateToken, isAdmin, deleteCourse);

// Admin chapter management
router.get(
  "/courses/:courseId/chapters",
  authenticateToken,
  isAdmin,
  getChapters
);
router.post(
  "/courses/:courseId/chapters",
  authenticateToken,
  isAdmin,
  createChapter
);
router.put(
  "/courses/:courseId/chapters/:id",
  authenticateToken,
  isAdmin,
  updateChapter
);
router.delete(
  "/courses/:courseId/chapters/:id",
  authenticateToken,
  isAdmin,
  deleteChapter
);

// Admin lesson management
router.get(
  "/chapters/:chapterId/lessons",
  authenticateToken,
  isAdmin,
  getLessons
);
router.post(
  "/chapters/:chapterId/lessons",
  authenticateToken,
  isAdmin,
  upload.single("video"),
  createLesson
);
router.put(
  "/chapters/:chapterId/lessons/:id",
  authenticateToken,
  isAdmin,
  upload.single("video"),
  updateLesson
);
router.delete(
  "/chapters/:chapterId/lessons/:id",
  authenticateToken,
  isAdmin,
  deleteLesson
);

module.exports = router;
