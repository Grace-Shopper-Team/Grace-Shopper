const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./Order');
const Coffee = require('./Coffee');

const OrderItem = db.define('orderItem', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Coffee,
      key: 'id',
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

module.exports = OrderItem;
