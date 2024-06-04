const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // sequelize 인스턴스를 가져옵니다.

const Employee = sequelize.define('Employee', {
  nickname: {
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
