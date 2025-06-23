const sequelize = require('../config/database');
   const Admin = require('./Admin');
   const User = require('./User');
   const Category = require('./Category');

   const models = {
       Admin,
       User,
       Category
   };

   module.exports = { sequelize, ...models };