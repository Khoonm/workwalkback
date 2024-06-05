// models/workStatus.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const WorkStatus = sequelize.define('WorkStatus', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_hours: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    commute_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    report: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = WorkStatus;
