const sequelize = require('../config/database');
const Admin = require('./Admin');
const User = require('./User');
const Category = require('./Category');
const Course = require('./Course');
const PasswordReset = require('./PasswordReset');
const Chapter = require('./Chapter');
const Lesson = require('./Lesson');
const LessonProgress = require('./LessonProgress');
const Comment = require('./Comment');
const Rating = require('./Rating');
const Note = require("./Note"); // Thêm Note

const models = {
  Admin,
  User,
  Category,
  Course,
  Lesson,
  Rating,
  LessonProgress,
  Chapter,
  PasswordReset,
  Comment,
  Note,
};

// Associations
PasswordReset.belongsTo(User, { foreignKey: 'email', targetKey: 'email' });
Chapter.hasMany(Lesson, { foreignKey: "chapter_id", as: "lessons" });
Lesson.belongsTo(Chapter, { foreignKey: "chapter_id" });
Note.belongsTo(User, { foreignKey: "user_id" });
Note.belongsTo(Lesson, { foreignKey: "lesson_id" });

module.exports = { sequelize, ...models };
