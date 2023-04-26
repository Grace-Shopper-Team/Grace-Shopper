const router = require('express').Router();
const Coffee = require('../db/models/Coffee');
const Order = require('../db/models/Order');
const OrderItem = require('../db/models/OrderItem');
const {
  requireToken,
  isAdmin,
  matchUserId,
} = require('../auth/gatekeepingMiddleware');

OrderItem.belongsTo(Coffee, {
  foreignKey: 'productId',
});
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
});
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
});

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const getAllOrders = await Order.findAll({
      include: { model: OrderItem, include: [Coffee] },
    });
    res.send(getAllOrders);
  } catch (error) {
    console.error('error retrieving all order', error);
    next(error);
  }
});

router.get('/:id/orderitems', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    const orderItems = await OrderItem.findAll({
      where: { orderId: order.id },
      include: { model: Coffee },
    });
    res.send(orderItems);
  } catch (error) {
    console.error('error retrieving order items', error);
    next(error);
  }
});

module.exports = router;
