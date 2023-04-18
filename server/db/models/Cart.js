const Sequelize = require('sequelize');
const User = require('./User');
const db = require('../db');

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = Cart;
