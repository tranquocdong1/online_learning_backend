const sequelize = require('../config/database');
const Admin = require('./Admin');
const User = require('./User');
const Category = require('./Category');
const Course = require('./Course');
const PasswordReset = require('./PasswordReset');

const models = {
  Admin,
  User,
  Category,
  Course,
  PasswordReset,
};

// Associations
PasswordReset.belongsTo(User, { foreignKey: 'email', targetKey: 'email' });

module.exports = { sequelize, ...models };
