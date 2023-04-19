// app
const express = require('express');
const path = require('path');
const cors = require('cors')  //change 

// authentication
const { authRouter } = require('./auth');
require('dotenv').config();

// logging middleware
const volleyball = require('volleyball');

// parsing middleware
const bodyParser = require('body-parser');
const app = express();
app.use(cors())  //here

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/auth', authRouter);
app.use('/api', require('./api'));



// error handling for 500
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
