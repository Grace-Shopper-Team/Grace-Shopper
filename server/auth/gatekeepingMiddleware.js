const User = require('../db/models/User');
const jwt = require('jsonwebtoken');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT || 'secret');
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      res.status(401).send('User not found');
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('Unauthorized to view this page');
  } else {
    next();
  }
};

const matchUserId = (req, res, next) => {
  if (req.user.id === parseInt(req.params.id) || req.user.isAdmin) {
    next();
  } else {
    res.status(403).send('Unauthorized to view this page');
  }
};

module.exports = { requireToken, isAdmin, matchUserId };
