const { LessonProgress } = require("../models");

const getProgressByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await LessonProgress.findAll({
      where: { user_id: userId },
      include: ["Lesson", "User"],
    });
    res.json({ data: progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    const { status } = req.body;

    // Xác thực trạng thái
    if (!["completed", "in_progress", "not_started"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    let progress = await LessonProgress.findOne({
      where: { user_id: userId, lesson_id: lessonId },
    });

    if (!progress) {
      progress = await LessonProgress.create({
        user_id: userId,
        lesson_id: lessonId,
        status,
        completed_at: status === "completed" ? new Date() : null,
      });
    } else {
      await progress.update({
        status,
        completed_at: status === "completed" ? new Date() : null,
      });
    }

    res.json({ message: "Progress updated successfully", data: progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProgressByUser, updateProgress };
