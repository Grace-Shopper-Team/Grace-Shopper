// define associations here
// more information on associations
// https://sequelize.org/docs/v6/core-concepts/assocs/
const Cart = require('./models/Cart');
const User = require('./models/User');
const CartItem = require('./models/CartItem');

Cart.belongsTo(User);
User.hasOne(Cart);
CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);

module.exports = {
  Cart,
  User,
  CartItem,
};
