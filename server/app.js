// app
const express = require('express');
const path = require('path');

// authentication
const { authRouter } = require('./auth');
require('dotenv').config();

// logging middleware
const volleyball = require('volleyball');

// parsing middleware
const bodyParser = require('body-parser');
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/auth', authRouter);
app.use('/api', require('./api'));

// send html if route doesnt exist
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling for 500
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
