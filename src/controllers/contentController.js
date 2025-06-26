const { Course, Chapter, Lesson } = require("../models");

const getChapters = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const chapters = await Chapter.findAll({
      where: { course_id: courseId },
      order: [["order_number", "ASC"]],
      attributes: ["id", "title", "order_number", "created_at", "updated_at"],
    });

    // Tính số lượng bài học cho mỗi chapter
    const chaptersWithLessonCount = await Promise.all(
      chapters.map(async (chapter) => {
        const lessonCount = await Lesson.count({ where: { chapter_id: chapter.id } });
        return { ...chapter.toJSON(), lesson_count: lessonCount };
      })
    );

    res.json({ data: chaptersWithLessonCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createChapter = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, order_number } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const chapter = await Chapter.create({ course_id: courseId, title, order_number });
    res.status(201).json({ message: "Chapter created successfully", chapter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateChapter = async (req, res) => {
  try {
    const { courseId, id } = req.params;
    const { title, order_number } = req.body;

    const chapter = await Chapter.findOne({
      where: { id, course_id: courseId },
    });
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    await chapter.update({
      title: title || chapter.title,
      order_number: order_number || chapter.order_number,
    });
    res.json({ message: "Chapter updated successfully", chapter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const { courseId, id } = req.params;
    const chapter = await Chapter.findOne({
      where: { id, course_id: courseId },
    });
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    await chapter.destroy();
    res.json({ message: "Chapter deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLessons = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findByPk(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    const lessons = await Lesson.findAll({
      where: { chapter_id: chapterId },
      order_number: [["order_number", "ASC"]],
      attributes: [
        "id",
        "title",
        "video_url",
        "order_number",
        "created_at",
        "updated_at",
      ],
    });

    res.json({
      data: lessons.map((lesson) => ({
        ...lesson.toJSON(),
        video_url: lesson.video_url
          ? `${req.protocol}://${req.get("host")}/uploads/${lesson.video_url}`
          : null,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({
      ...lesson.toJSON(),
      video_url: lesson.video_url
        ? `${req.protocol}://${req.get("host")}/uploads/${lesson.video_url}`
        : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const createLesson = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { title, order_number } = req.body;
    const video_url = req.file ? req.file.filename : null;

    const chapter = await Chapter.findByPk(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const lesson = await Lesson.create({
      chapter_id: chapterId,
      title,
      video_url,
      order_number,
    });
    res.status(201).json({ message: "Lesson created successfully", lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateLesson = async (req, res) => {
  try {
    const { chapterId, id } = req.params;
    const { title, order_number } = req.body;
    const video_url = req.file ? req.file.filename : null;

    const lesson = await Lesson.findOne({
      where: { id, chapter_id: chapterId },
    });
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    await lesson.update({
      title: title || lesson.title,
      video_url: video_url || lesson.video_url,
      order_number: order_number || lesson.order_number,
    });
    res.json({ message: "Lesson updated successfully", lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const { chapterId, id } = req.params;
    const lesson = await Lesson.findOne({
      where: { id, chapter_id: chapterId },
    });
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    await lesson.destroy();
    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonById,
};
