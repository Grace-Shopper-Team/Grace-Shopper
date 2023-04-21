// app
const express = require('express');
const path = require('path');
// const cors = require('cors'); //change

// authentication
const { authRouter } = require('./auth');
require('dotenv').config();

// logging middleware
const volleyball = require('volleyball');

// parsing middleware
const bodyParser = require('body-parser');
const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   allowedHeaders: ['authorization'],
// };

// app.use(cors(corsOptions));
<<<<<<< HEAD
// app.use(cors()); //here
=======

app.use(cors()); //here
>>>>>>> first commit new branch

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/auth', authRouter);
app.use('/api', require('./api'));
// app.use('/api', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling for 500
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
