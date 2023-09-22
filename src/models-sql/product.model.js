const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('chatbot', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres', // Puedes cambiar esto si estás usando otro dialecto de PostgreSQL
});

const Product = sequelize.define('products', {
  title: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = Product;
