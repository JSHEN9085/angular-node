// to start the server, use command  'npm run start:server'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const postsRoutes = require('./routes/posts')
// app.use((req, res, next) => {
//   console.log('Fist middleware');
//   next(); // continue to response, if we comment it, it will stay in here forever
// });

// mongoose go to https://cloud.mongodb.com/user#/atlas/login and login, if using different internet, need to change the IP address
mongoose.connect("mongodb+srv://jshen9085:Working@2013@cluster0-h4nd4.mongodb.net/angular-node?retryWrites=true", { useNewUrlParser: true })
  .then(() => {console.log("Connected to database!")})
  .catch(() => {console.log("Connection failed")})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, OPTIONS")
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/posts', postsRoutes); // made routes in './routes/posts' starting from the first argument, '/api/posts'

module.exports = app;
