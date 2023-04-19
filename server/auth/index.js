const authRouter = require('./auth.router');
const User = require('../db/models/User');
const { authenticate, hashPassword } = require('./authentication');

module.exports = {
  authRouter,
  User,
  authenticate,
  hashPassword
};