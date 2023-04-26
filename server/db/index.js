const { User, Cart, CartItem, Coffee, Order, OrderItem } = require('./models');

Cart.belongsTo(User);
User.hasOne(Cart);
CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);
CartItem.belongsTo(Coffee, {
  foreignKey: 'productId',
});

Order.hasMany(OrderItem, {
  foreignKey: 'OrderId',
  as: 'orderItems',
});
OrderItem.belongsTo(Order, {
  foreignKey: 'OrderId',
  as: 'order',
});
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders',
});
Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});
Order.hasMany(OrderItem, {
  foreignKey: 'OrderId',
  as: 'itemsOrdered',
});
OrderItem.belongsTo(Order, {
  foreignKey: 'OrderId',
  as: 'order',
});
Coffee.belongsTo(OrderItem, {
  foreignKey: 'productId',
});

module.exports = {
  Cart,
  User,
  CartItem,
  Coffee,
  Order,
  OrderItem,
};
