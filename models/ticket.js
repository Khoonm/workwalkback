const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Employee = require('./employee.js');

const Ticket = sequelize.define('Ticket', {
    TICKET_IDX: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        unique : true,
        allowNull: false,
    },
    USER_KEY_CD: {
        type: DataTypes.STRING(8),
        references: {
            model: Employee,
            key: 'USER_KEY_CD'
        },
        allowNull: false,
    },
    TITLE_STR: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    DATE_ST_YMD: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    DATE_END_YMD: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    CONTENT_STR: {
        type: DataTypes.STRING(5000),
        allowNull: false,
    },
    MANAGER_STR: {
        type: DataTypes.STRING(4),
        allowNull: false,
    },
    STATUS_FLG: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Employee.hasMany(Ticket, { foreignKey: 'USER_KEY_CD' });
Ticket.belongsTo(Employee, { foreignKey: 'USER_KEY_CD' });

module.exports = Ticket;
