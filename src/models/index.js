const sequelize = require('../config/database');
const Admin = require('./Admin');
const User = require('./User');
const Category = require('./Category');
const Course = require('./Course');
const PasswordReset = require('./PasswordReset');
const Chapter = require('./Chapter');
const Lesson = require('./Lesson');
const LessonProgress = require('./LessonProgress');
const Rating = require('./Rating');

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
};

// Associations
PasswordReset.belongsTo(User, { foreignKey: 'email', targetKey: 'email' });

module.exports = { sequelize, ...models };
