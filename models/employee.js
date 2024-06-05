const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Employee;
