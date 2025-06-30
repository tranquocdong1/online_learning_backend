const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Chapter = require('./Chapter');

const Lesson = sequelize.define('Lesson', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Chapter,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    video_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    order_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true, // Có thể để null nếu video chưa có thời lượng
        defaultValue: 0  // Giá trị mặc định là 0 giây
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
    tableName: 'lessons',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

Lesson.belongsTo(Chapter, { foreignKey: 'chapter_id' });

module.exports = Lesson;