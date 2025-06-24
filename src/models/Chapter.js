const { DataTypes } = require('sequelize');
   const sequelize = require('../config/database');
   const Course = require('./Course');

   const Chapter = sequelize.define('Chapter', {
       id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true
       },
       course_id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           references: {
               model: Course,
               key: 'id'
           }
       },
       title: {
           type: DataTypes.STRING(255),
           allowNull: false
       },
       order_number: {
           type: DataTypes.INTEGER,
           allowNull: false,
           defaultValue: 1
       },
       created_at: {
           type: DataTypes.DATE,
           defaultValue: DataTypes.NOW
       },
       updated_at: {
           type: DataTypes.DATE,
           defaultValue: DataTypes.NOW
       }
   }, {
       tableName: 'chapters',
       timestamps: true,
       updatedAt: 'updated_at',
       createdAt: 'created_at'
   });

   Chapter.belongsTo(Course, { foreignKey: 'course_id' });

   module.exports = Chapter;