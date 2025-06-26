const { LessonProgress, Chapter, Lesson } = require("../models");

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

// Thêm endpoint mới để lấy số lượng học viên
const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const chapters = await Chapter.findAll({ where: { course_id: courseId } });
    const chapterIds = chapters.map((chapter) => chapter.id);
    const lessons = await Lesson.findAll({ where: { chapter_id: chapterIds } });
    const lessonIds = lessons.map((lesson) => lesson.id);

    const progressCount = await LessonProgress.count({
      where: { lesson_id: lessonIds },
    });

    res.json({ data: { enrolledUsers: progressCount } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProgressByUser, updateProgress, getCourseProgress };