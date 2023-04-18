const Sequelize = require('sequelize');
const db = require('../db');

const Coffee = db.define('coffee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: { notEmpty: true },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2237&q=80',
  },
  roast: {
    type: Sequelize.STRING,
  },
  origin: {
    type: Sequelize.STRING,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

module.exports = Coffee;
