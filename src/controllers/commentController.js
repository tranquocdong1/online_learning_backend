const { Comment } = require('../models');

const getCommentsByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const comments = await Comment.findAll({
      where: { lesson_id: lessonId },
      include: ['User'],
      order: [['created_at', 'DESC']],
    });
    res.json({ data: comments });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createComment = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Lấy từ middleware authenticateToken

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const comment = await Comment.create({
      user_id: userId,
      lesson_id: lessonId,
      content,
    });

    res.status(201).json({ message: 'Comment created successfully', data: comment });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateComment = async (req, res) => {
  try {
    const { lessonId, commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findOne({
      where: { id: commentId, lesson_id: lessonId, user_id: userId },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    await comment.update({ content });
    res.json({ message: 'Comment updated successfully', data: comment });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { lessonId, commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findOne({
      where: { id: commentId, lesson_id: lessonId, user_id: userId },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCommentsByLesson, createComment, updateComment, deleteComment };