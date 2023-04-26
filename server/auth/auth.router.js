const router = require('express').Router();
const User = require('../db/models/User');
const CartItem = require('../db/models/CartItem');
const Cart = require('../db/models/Cart');
const Order = require('../db/models/Order');
const OrderItem = require('../db/models/OrderItem');
const Coffee = require('../db/models/Coffee');

const {
  requireToken,
  isAdmin,
  matchUserId,
} = require('./gatekeepingMiddleware');

router.get('/users', requireToken, isAdmin, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/users/:id', requireToken, matchUserId, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
    } = req.body;
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const message = err.errors[0].message;
      res.status(401).send({ error: message });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      const field = err.errors[0].path;
      const message = `${field.charAt(0).toUpperCase()}${field.slice(1)} is already in use`;
      res.status(401).send({ error: message });
    } else {
      next(err);
    }
  }
});

router.put('/users/:id', requireToken, matchUserId, async (req, res, next) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
    } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      user.username = username;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.address = address;
      user.city = city;
      user.state = state;
      user.zip = zip;
      await user.save();
      res.send(user);
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: error.errors[0].message });
    } else if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
    next(error);
  }
});

router.put(
  '/users/:id/admin',
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).send('Unauthorized to perform this action');
      }
      const { isAdmin } = req.body;
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        user.isAdmin = isAdmin;
        await user.save();
        res.send(user);
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/users/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const deleteThisUser = await User.findByPk(req.params.id);
    console.log('deleteduser:', deleteThisUser);
    await CartItem.destroy({
      where: { cartId: req.params.id },
    });
    await Cart.destroy({
      where: { userId: req.params.id },
    });
    const getAllUserOrders = await Order.findAll({
      where: { userId: req.params.id },
    });
    for (const order of getAllUserOrders) {
      await OrderItem.destroy({
        where: { orderId: order.id },
      });
    }
    await Order.destroy({ where: { userId: req.params.id } });
    await deleteThisUser.destroy();
    res.send(deleteThisUser);
  } catch (error) {
    console.error('error deleting user', error);
    
  } 
});

// ! order routes ! //

router.get(
  '/users/:id/orders',
  requireToken,
  matchUserId,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      const getOrders = await Order.findAll({
        where: { userId: user.id },
        include: { model: OrderItem, include: [Coffee] },
      });
      res.send(getOrders);
    } catch (error) {
      console.error('error retrieving order data', error);
      next(error);
    }
  }
);

router.get(
  '/users/:id/orders/:orderId',
  requireToken,
  matchUserId,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      const getSingleOrder = await Order.findOne({
        where: { userId: user.id },
        include: { model: OrderItem, include: [Coffee] },
      });
      res.send(getSingleOrder);
    } catch (error) {
      console.error('error retrieving single order', error);
      next(error);
    }
  }
);

router.post(
  '/users/:id/orders',
  requireToken,
  matchUserId,
  async (req, res, next) => {
    try {
      //! working, just need to connect to purchase data
      const orderData = req.body;
      const { orderItems } = req.body;
      const userId = req.params.id;

      const newOrder = await Order.create({ ...orderData, userId });
      const createOrderItems = await Promise.all(
        orderItems.map((item) => {
          return OrderItem.create({ ...item, orderId: newOrder.id });
        })
      );
      res.send({ newOrder, createOrderItems });
    } catch (error) {
      console.error('error creating order', error);
      next(error);
    }
  }
);

router.delete(
  '/users/:id/orders/:orderId',
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const deleteThisOrder = await Order.findByPk(req.params.orderId);
      await OrderItem.destroy({ where: { orderId: req.params.orderId } });
      await Order.destroy({ where: { id: req.params.id } });
      res.send(deleteThisOrder);
    } catch (error) {
      console.error('error deleting order', error);
      next(error);
    }
  }
);

module.exports = router;
