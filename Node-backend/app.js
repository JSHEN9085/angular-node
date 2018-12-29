const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Post = require('./models/post')
// app.use((req, res, next) => {
//   console.log('Fist middleware');
//   next(); // continue to response, if we comment it, it will stay in here forever
// });

mongoose.connect("mongodb+srv://jshen9085:Working@2013@cluster0-h4nd4.mongodb.net/angular-node?retryWrites=true", { useNewUrlParser: true })
  .then(() => {console.log("Connected to database!")})
  .catch(() => {console.log("Connection failed")})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, OPTIONS")
  next()
})


app.get('/api/posts' , (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      posts: documents
    });
  });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post is not found"})
    }
  })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: "Post added",
      postId: result._id
    });
  })
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({message: "successfully updated"})
  })
})

app.delete('/api/posts/:id', (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Post deleted"})
  })
})

module.exports = app;
