const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db/models/User');
require('dotenv').config();

const SALT_ROUNDS = 5;

User.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  console.log("generate")
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.authenticate = async function ({ username, password }) {
  console.log("authenticate")
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};


const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.addHook('beforeSave', hashPassword);

module.exports = {
  User,
  hashPassword
};