const { Course, Category } = require("../models");
const path = require("path");

const getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Course.findAndCountAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      attributes: [
        "id",
        "title",
        "description",
        "category_id",
        "thumbnail",
        "status",
        "created_at",
        "updated_at",
      ],
      include: [{ model: Category, attributes: ["name"] }],
    });

    res.json({
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows.map((course) => ({
        ...course.toJSON(),
        thumbnail: course.thumbnail
          ? `${req.protocol}://${req.get("host")}/uploads/${course.thumbnail}`
          : null,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createCourse = async (req, res) => {
  try {
    const { title, description, category_id, status } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    if (!title || !category_id) {
      return res
        .status(400)
        .json({ message: "Title and category are required" });
    }

    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const course = await Course.create({
      title,
      description,
      category_id,
      thumbnail,
      status,
    });
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category_id, status } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    await course.update({
      title: title || course.title,
      description,
      category_id: category_id || course.category_id,
      thumbnail: thumbnail || course.thumbnail,
      status: status || course.status,
    });

    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.destroy();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCourses, createCourse, updateCourse, deleteCourse };
