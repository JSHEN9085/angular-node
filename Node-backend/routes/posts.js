const express = require('express');

const router = express.Router();

const Post = require('../models/post');

router.get('' , (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post is not found"})
    }
  })
})

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({message: "successfully updated"})
  })
})

router.delete('/:id', (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Post deleted"})
  })
})

module.exports = router;
