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
const { authenticateToken, isAdmin } = require("../middlewares/auth");

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

module.exports = router;
