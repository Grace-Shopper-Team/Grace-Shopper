const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      len: [8, 100],
      hasUpperCase: function (value) {
        if (!/[A-Z]/.test(value)) {
          throw new Error(
            'The password must contain at least one uppercase letter'
          );
        }
      },
      hasLowerCase: function (value) {
        if (!/[a-z]/.test(value)) {
          throw new Error(
            'The password must contain at least one lowercase letter'
          );
        }
      },
      hasNumber: function (value) {
        if (!/\d/.test(value)) {
          throw new Error('The password must contain at least one number');
        }
      },
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
      async isUnique(email) {
        const user = await this.constructor.findOne({ where: { email } });
        if (user) {
          throw new Error('Email address is already in use');
        }
      },
    },
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = User;
