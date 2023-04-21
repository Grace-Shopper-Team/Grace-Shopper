const router = require('express').Router();
const User = require('../db/models/User');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

router.get('/users', requireToken, isAdmin, async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'username']
  });
  res.json(users);
});

router.get('/users/:id', async (req, res, next) => {
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
    const { username, password, firstName, lastName, email, address, city, state, zip } = req.body;
    const user = await User.create({ username, password, firstName, lastName, email, address, city, state, zip });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

module.exports = router;
