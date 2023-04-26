const Sequelize = require('sequelize');
const User = require('./User');
const db = require('../db');

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  totalAmount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
