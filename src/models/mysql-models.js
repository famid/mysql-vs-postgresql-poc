const { DataTypes } = require('sequelize');
const { mysqlDb } = require('../config/db');

// MySQL Models
const UserMySQL = mysqlDb.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
  });
  
  const ProductMySQL = mysqlDb.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    metadata: DataTypes.JSON, // Supported but less optimized in MySQL
  });
  
  const OrderMySQL = mysqlDb.define('Order', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
  });

  module.exports = {
    UserMySQL,
    ProductMySQL,
    OrderMySQL,
  };