const { DataTypes } = require('sequelize');
   const sequelize = require('../config/database');

   const Admin = sequelize.define('Admin', {
       id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true
       },
       username: {
           type: DataTypes.STRING(50),
           allowNull: false,
           unique: true
       },
       password: {
           type: DataTypes.STRING(255),
           allowNull: false
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
       tableName: 'admins',
       timestamps: true,
       updatedAt: 'updated_at',
       createdAt: 'created_at'
   });

   module.exports = Admin;