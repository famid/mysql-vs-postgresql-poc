require('dotenv').config();
const { Sequelize } = require('sequelize');

// PostgreSQL Configuration
const postgresDb = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST || 'postgres-db', // Fallback to Docker host
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

// MySQL Configuration
const mysqlDb = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST || 'mysql-db', // Fallback to Docker host
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = { postgresDb, mysqlDb };
