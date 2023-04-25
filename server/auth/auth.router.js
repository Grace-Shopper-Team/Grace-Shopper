const router = require('express').Router();
const User = require('../db/models/User');
const CartItem = require('../db/models/CartItem');
const Cart = require('../db/models/Cart');
const {
  requireToken,
  isAdmin,
  matchUserId,
} = require('./gatekeepingMiddleware');

router.get('/users', requireToken, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
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
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
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
  } catch (err) {
    next(err);
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
    await CartItem.destroy({
      where: { cartId: req.params.id },
    });
    await Cart.destroy({
      where: { userId: req.params.id },
    });
    await deleteThisUser.destroy();
    res.send(deleteThisUser);
  } catch (error) {
    console.error('error deleting user', error);
    next(error);
  }
});

module.exports = router;
