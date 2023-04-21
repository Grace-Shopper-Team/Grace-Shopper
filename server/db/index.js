const { User, Cart, CartItem, Coffee } = require('./models');

Cart.belongsTo(User);
User.hasOne(Cart);
CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);
CartItem.belongsTo(Coffee, {
  foreignKey: 'productId',
});

module.exports = {
  Cart,
  User,
  CartItem,
  Coffee,
};
