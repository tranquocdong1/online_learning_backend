const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import User model

const Note = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Tên bảng
        key: 'id',     // Khóa ngoại tham chiếu đến User.id
      },
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'notes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false, // Không cần updated_at nếu không sử dụng
  }
);

// Quan hệ
Note.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Note;