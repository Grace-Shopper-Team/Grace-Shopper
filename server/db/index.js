const { User, Cart, CartItem, Coffee,} = require('./models');

Cart.belongsTo(User);
User.hasOne(Cart);
CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);
CartItem.belongsTo(Coffee, {
  foreignKey: 'productId',
});
// User.belongsToMany(Coffee, { through: Favorite });
// Coffee.belongsToMany(User, { through: Favorite });

module.exports = {
  Cart,
  User,
  CartItem,
  Coffee,
//   Favorite
};
