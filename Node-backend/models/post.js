const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true, default: "New Post"}, //node.js use capital S
  content: {type: String, required: true, default: "Hello"}
});

module.exports = mongoose.model('Post', postSchema) //1st argument is the model name, 2nd argument is the schema I want to use
