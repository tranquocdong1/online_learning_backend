const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Lesson = require('./Lesson');

const LessonProgress = sequelize.define('LessonProgress', {
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
  status: {
    type: DataTypes.ENUM('completed', 'in_progress', 'not_started'),
    defaultValue: 'not_started',
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'lesson_progress',
  timestamps: false, // Vì bảng không có created_at và updated_at
});

LessonProgress.belongsTo(User, { foreignKey: 'user_id' });
LessonProgress.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = LessonProgress;