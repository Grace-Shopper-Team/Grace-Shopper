const { User, Cart, CartItem } = require('./models');

Cart.belongsTo(User);
User.hasOne(Cart);
CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);

module.exports = {
  Cart,
  User,
  CartItem,
};
