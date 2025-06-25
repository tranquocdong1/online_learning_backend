// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const { getPublicCategories } = require("../controllers/categoryController");

// Route công khai cho user lấy danh sách category
router.get("/categories", getPublicCategories);

module.exports = router;
