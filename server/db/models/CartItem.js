const Sequelize = require('sequelize');
const Cart = require('./Cart');
const Coffee = require('./Coffee');
const db = require('../db');

const CartItem = db.define('cartitem', {
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
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
    defaultValue: 1,
  },
});

module.exports = CartItem;
