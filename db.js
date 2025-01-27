const { Sequelize } = require('sequelize');

// PostgreSQL Connection
const postgresDb = new Sequelize('mydb', 'myuser', 'mypassword', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

// MySQL Connection
const mysqlDb = new Sequelize('mydb', 'myuser', 'mypassword', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

module.exports = { postgresDb, mysqlDb };
