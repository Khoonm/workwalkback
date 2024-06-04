const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite', // 사용하는 데이터베이스 종류에 따라 변경 (예: 'postgres', 'sqlite', 'mssql')
  storage: "./database.sqlite"
});

module.exports = sequelize;