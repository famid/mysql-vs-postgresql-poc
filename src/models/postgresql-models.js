const { DataTypes } = require('sequelize');
const { postgresDb } = require('../config/db');

// PostgreSQL Models
const UserPostgres = postgresDb.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  age: DataTypes.INTEGER,
});

const ProductPostgres = postgresDb.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  metadata: DataTypes.JSON, // JSON for additional details (PostgreSQL advantage)
});

const OrderPostgres = postgresDb.define('Order', {
  userId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  orderDate: DataTypes.DATE,
});

module.exports = {
  UserPostgres,
  ProductPostgres,
  OrderPostgres,
};
