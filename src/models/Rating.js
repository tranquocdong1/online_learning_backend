const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Lesson = require('./Lesson');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Lesson,
      key: 'id',
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'ratings', // Sử dụng tên bảng hiện có
  timestamps: false, // Vì bảng không có updated_at
});

Rating.belongsTo(User, { foreignKey: 'user_id' });
Rating.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = Rating;