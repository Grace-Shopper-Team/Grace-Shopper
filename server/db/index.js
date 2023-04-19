// define associations here
// more information on associations
// https://sequelize.org/docs/v6/core-concepts/assocs/

const { User, Cart, CartItem } = require('./db/models');

Cart.belongsTo(User);
User.hasOne(Cart);
CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);

module.exports = {
  Cart,
  User,
  CartItem,
};