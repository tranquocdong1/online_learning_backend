const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Lesson = require('./Lesson');

const Comment = sequelize.define('Comment', {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'comments',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = Comment;