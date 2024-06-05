const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const CrawledData = sequelize.define('CrawledData', {
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = CrawledData;
