const Sequelize = require('sequelize');
console.log('Opening database connection');

// change database name to yours
const db = new Sequelize('postgres://localhost:5432/coffeeshop', {
  logging: false,
});

module.exports = db;
