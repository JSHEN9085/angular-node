const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Post = require('./models/post')
// app.use((req, res, next) => {
//   console.log('Fist middleware');
//   next(); // continue to response, if we comment it, it will stay in here forever
// });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS")
  next()
})


app.get('/api/posts' , (req, res, next) => {
  const posts = [
    {id: '1', title: "Test", content: "from backend"},
    {id: '2', title: "Test2", content: "from backend2"}
  ];
  return res.status(200).json({posts})
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: "Post added"
  });
});

module.exports = app;
