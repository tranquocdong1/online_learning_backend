const { Note } = require("../models");

const createNote = async (req, res) => {
  try {
    const { id } = req.user; // Sử dụng req.user.id
    const { lesson_id, content } = req.body;

    const note = await Note.create({ user_id: id, lesson_id, content });
    res.status(201).json({ message: "Ghi chú đã được tạo", data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo ghi chú" });
  }
};

const getNotesByUser = async (req, res) => {
  try {
    const { id } = req.user; // Sử dụng req.user.id
    console.log("User ID from token:", id);
    if (!id) {
      return res.status(400).json({ message: "User ID not found in token" });
    }
    const notes = await Note.findAll({
      where: { user_id: id }, // Sử dụng id thay vì user_id
      include: ["Lesson", "User"],
    });
    res.json({ data: notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Lỗi khi lấy ghi chú" });
  }
};

module.exports = { createNote, getNotesByUser };