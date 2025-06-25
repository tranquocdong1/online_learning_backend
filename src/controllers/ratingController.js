const { Rating } = require('../models');

const getLessonRating = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const ratings = await Rating.findAll({
      where: { lesson_id: lessonId },
      attributes: ['rating'],
    });
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    const average = ratings.length > 0 ? total / ratings.length : 0;
    res.json({ averageRating: Number(average.toFixed(1)), totalRatings: ratings.length });
  } catch (error) {
    console.error('Get rating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createOrUpdateRating = async (req, res) => {
  try {
    const { user } = req; // Lấy toàn bộ req.user
    if (!user || !user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = user.id; // Lấy userId từ object user
    const { lessonId } = req.params;
    const { rating } = req.body;

    console.log('User ID:', userId, 'Lesson ID:', lessonId, 'Rating:', rating); // Debug

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    let ratingRecord = await Rating.findOne({
      where: { user_id: userId, lesson_id: lessonId },
    });

    if (!ratingRecord) {
      ratingRecord = await Rating.create({
        user_id: userId,
        lesson_id: lessonId,
        rating,
      });
    } else {
      await ratingRecord.update({ rating });
    }

    res.json({ message: 'Rating updated successfully', data: ratingRecord });
  } catch (error) {
    console.error('Update rating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getLessonRating, createOrUpdateRating };