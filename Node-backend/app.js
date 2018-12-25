const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Fist middleware');
  next(); // continue to response, if we comment it, it will stay in here forever
});

app.use((req, res, next) => {
  res.send('Express');
});

module.exports = app;
