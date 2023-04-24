const router = require('express').Router();
const User = require('../db/models/User');
<<<<<<< HEAD
const { requireToken, isAdmin, matchUserId } = require('./gatekeepingMiddleware');
=======
const {
  requireToken,
  isAdmin,
  matchUserId,
} = require('./gatekeepingMiddleware');
>>>>>>> combined auth logic with current updates

router.get('/users', requireToken, isAdmin, async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'username'],
  });
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
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.put('/users/:id', requireToken, matchUserId, async (req, res, next) => {
  try {
<<<<<<< HEAD
    const { username, password, firstName, lastName, email, address, city, state, zip } = req.body;
=======
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
>>>>>>> combined auth logic with current updates
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

<<<<<<< HEAD


=======
>>>>>>> combined auth logic with current updates
module.exports = router;
